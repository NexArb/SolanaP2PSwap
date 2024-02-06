from datetime import timedelta, datetime
from typing import List, Any
import web3
from fastapi import APIRouter, HTTPException, Depends, Security
from fastapi.security import OAuth2PasswordRequestForm
from typing_extensions import Annotated
from app.api.data.auth_data import User, SetNotificationTypeRequest, Token, SetOTP
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database, get_db
from app.utils.environment.environment_manager import EnvironmentManager, get_environment_manager
from app.utils.error_handler.error_codes import ErrorCode
from app.utils.error_handler.response_handler import return_error_message
from app.utils.notification.data import OTPNotification, NotificationReasons
from app.utils.notification.user_notification import send_notification_to_user
from app.utils.security.authenticate import create_access_token, authenticate_user, \
    get_password_hash, get_current_user, authenticate_user_via_wallet
from app.api.data.general import return_success_response, BaseResponse, return_success_response_with_data
from app.utils.security.otp import OTPType, generate_otp, verify_otp
from app.utils.security.scopes import UserScopes

router = APIRouter(prefix="/auth", tags=["Auth"])


def create_token(username: str, scopes: List[str], env_manager: EnvironmentManager) -> str:
    access_token_expires = timedelta(minutes=60 * 60 * 8)
    return create_access_token(
        env_manager=env_manager,
        data={"sub": username, "scopes": scopes},
        expires_delta=access_token_expires,
    )


@router.post("/login", response_model=Token)
def login(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: Database = Depends(get_db),
        env_manager: EnvironmentManager = Depends(get_environment_manager),
):
    user = authenticate_user(username=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_token(form_data.username, user["scopes"], env_manager)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login/wallet", response_model=Token)
def login_via_wallet(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: Database = Depends(get_db),
        env_manager: EnvironmentManager = Depends(get_environment_manager),
):
    user = authenticate_user_via_wallet(wallet_address=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_token(form_data.username, user["scopes"], env_manager)
    return {"access_token": access_token, "token_type": "bearer"}


def get_user(db: Database, form_data: OAuth2PasswordRequestForm) -> [Any]:
    return db.get_object(CollectionName.USER.value, {"username": form_data.username})


@router.post("/register/admin")
def create_error_code(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        env_manager: EnvironmentManager = Depends(get_environment_manager),
        db: Database = Depends(get_db)
):
    results = get_user(db,form_data)
    if results is None or len(results) != 0:
        raise HTTPException(status_code=400, detail="User is already exist")
    object_id = db.insert_object(CollectionName.USER.value,
                                 User(username=form_data.username,
                                      password=get_password_hash(form_data.password),
                                      scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value]).__dict__)
    if object_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    return return_success_response()


@router.post("/register", response_model=Token)
def register(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: Database = Depends(get_db),
        env_manager: EnvironmentManager = Depends(get_environment_manager)
):
    results = get_user(db,form_data)
    if results is None or len(results) != 0:
        raise HTTPException(status_code=400, detail="User is already exist")
    object_id = db.insert_object(CollectionName.USER.value,
                                 User(username=form_data.username,
                                      password=get_password_hash(form_data.password),
                                      scopes=[UserScopes.USER_READ.value, UserScopes.USER_WRITE.value]).__dict__)
    if object_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    access_token = create_token(form_data.username, [UserScopes.USER_READ.value, UserScopes.USER_WRITE.value],
                                env_manager)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register/wallet", response_model=BaseResponse[dict])
def register_wallet_address(
        wallet_address: str,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db)
):
    if not web3.Web3.is_address(wallet_address):
        raise HTTPException(status_code=400, detail="Wallet address is not valid")
    db.update_object(CollectionName.USER.value,
                     {"username": current_user["username"]},
                     {"wallet_address": wallet_address})
    return return_success_response()


@router.put("/set/notification/", response_model=BaseResponse[dict])
def set_users_notification_type(
        set_notification_data: SetNotificationTypeRequest,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db)
):
    updated_count = db.update_object(CollectionName.USER.value,
                                     {"username": current_user["username"]},
                                     {
                                         "notification_type": set_notification_data.notification_type,
                                         "notification_identifier": set_notification_data.notification_identifier
                                     }
                                     )
    if updated_count != 1:
        raise HTTPException(status_code=400, detail="Wallet address is not valid")
    return return_success_response()


@router.post("/otp/{user_identifier}")
def get_otp(
        user_identifier: str,
        env_manager: EnvironmentManager = Depends(get_environment_manager),
        db: Database = Depends(get_db)
):
    user = db.get_single_object(
        CollectionName.USER.value,
        {
            "$or": [
                {"username": user_identifier},
                {"wallet_address": user_identifier}
            ]
        }
    )
    if user is None:
        return return_error_message(db, ErrorCode.OBJECT_NOT_FOUND)
    user_obj = User(**user)
    otp_code = generate_otp(env_manager)
    send_notification_to_user(
        db,
        user_obj.username,
        OTPNotification("Your otp code", "OTP Code", otp_code),
        NotificationReasons.OTP.value
    )
    return return_success_response()


@router.post("/otp/verify/{code}")
def verify_otp_by_code(
        code: str,
        env_manager: EnvironmentManager = Depends(get_environment_manager),
        db: Database = Depends(get_db)
):
    res = verify_otp(code, env_manager)
    if not res:
        return return_error_message(db, ErrorCode.WRONG_OTP_CODE)
    return return_success_response()


@router.post("/password-reset/request", response_model=Token)
def password_reset_request(
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
        env_manager: EnvironmentManager = Depends(get_environment_manager)
):
    current_time = datetime.utcnow()
    reset_request = db.get_single_object(
        CollectionName.PASSWORD_RESET_REQUESTS.value,
        {"user_id": current_user['_id']}
    )
    if reset_request:
        last_change = reset_request.get('last_password_change')
        if last_change and (current_time - last_change).total_seconds() < 7200:  # 7200 seconds = 2 hours
            return return_error_message(db, ErrorCode.TOO_SOON_TO_RESET)

    otp_code = generate_otp(env_manager)
    expiry_time = current_time + timedelta(hours=2)
    db.update_object(
        "PasswordResetRequests",
        {"user_id": current_user['_id']},
        {
            "reset_otp": otp_code,
            "otp_expiry": expiry_time,
            "password_changed": False,
            "last_password_change": None,
            "is_deleted": False
        },
        upsert=True
    )
    send_notification_to_user(
        db,
        current_user['username'],
        OTPNotification("Your password reset code", "OTP Code", otp_code),
        NotificationReasons.PASSWORD_RESET_REQUEST.value
    )
    return return_success_response()


@router.post("/password-reset/verify")
def verify_otp_and_update_password(
        current_user: Annotated[User, Depends(get_current_user)],
        otp_code: str,
        new_password: str,
        db: Database = Depends(get_db)
):
    reset_request = db.get_single_object(
        CollectionName.PASSWORD_RESET_REQUESTS.value,
        {"user_id": current_user["_id"]}
    )
    if not reset_request:
        return return_error_message(db, ErrorCode.RESET_REQUEST_NOT_FOUND)

    current_time = datetime.utcnow()
    if (reset_request['reset_otp'] == otp_code and
            reset_request['otp_expiry'] > current_time and
            not reset_request['password_changed']):
        db.update_object(
            CollectionName.USER.value,
            {"_id": current_user['_id']},
            {"password": get_password_hash(new_password),}
        )
        db.update_object(
            "PasswordResetRequests",
            {"user_id": current_user['_id']},
            {
                "password_changed": True,
                "last_password_change": current_time
            }
        )
        return return_success_response()
    else:
        return return_error_message(db, ErrorCode.INVALID_OTP_OR_EXPIRED)


@router.post("/otp/set/")
def set_otp_choice(
        set_otp: SetOTP,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db)
):
    otp_types = [i.replace("OTPType.","").lower() for i in list(map(str, OTPType))]
    if set_otp.otp_type.lower() not in otp_types:
        return return_error_message(db, ErrorCode.UNEXPECTED_DATA)
    updated_count = db.update_object(
        CollectionName.USER.value,
    {"username": current_user["username"]},
        {
            "otp_type": set_otp.otp_type,
            "otp_identifier": set_otp.otp_identifier
        }
    )
    if updated_count != 1:
        return return_error_message(db, ErrorCode.NOT_UPDATED)
    return return_success_response()


@router.get("/otp/choices")
def possible_otp_choices(
        current_user: Annotated[User, Depends(get_current_user)],
):
    return return_success_response_with_data(data=list(map(lambda x: x.value, OTPType)))
