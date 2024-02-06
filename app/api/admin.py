from fastapi import APIRouter, Depends, Security
from typing_extensions import Annotated

from app.api.data.auth_data import User
from app.api.data.general import return_success_response, return_success_response_with_data, Content
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database, get_db
from app.utils.error_handler.error_codes import ErrorCode
from app.utils.error_handler.error_data import CustomError
from app.utils.error_handler.response_handler import return_error_message
from app.utils.security.authenticate import get_current_user
from app.utils.security.scopes import UserScopes

router = APIRouter(tags=["Admin"], prefix="/admin")


@router.post("/create/error_code")
def create_error_code(
        create_error: CustomError,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    obj_id = db.insert_object(CollectionName.ERROR_MESSAGES.value, create_error.__dict__)
    if obj_id is None:
        return return_error_message(db, ErrorCode.NOT_INSERTED)
    return return_success_response()


@router.delete("/error_code/{id}")
def delete_error_message(
        id: str,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    total_deleted = db.delete_object(
        CollectionName.ERROR_MESSAGES.value,
        {
            "_id": id
        }
    )
    if total_deleted != 1:
        return return_error_message(db, ErrorCode.NOT_DELETED)
    return return_success_response()


@router.put("/error_code/{id}")
def update_error_message(
        id: str,
        create_error: CustomError,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    total_updated = db.update_object(
        CollectionName.ERROR_MESSAGES.value,
        {
            "_id": id
        },
        create_error.__dict__
    )
    if total_updated != 1:
        return return_error_message(db, ErrorCode.NOT_DELETED)
    return return_success_response()


@router.get("/error_code/{id}")
def get_error_message(
        id: str,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[])],
        db: Database = Depends(get_db)
):
    objs = db.get_object(
        CollectionName.ERROR_MESSAGES.value,
        {
            "_id": id
        },
    )
    return return_success_response_with_data(objs)


@router.post("/content")
def add_content(
        content: Content,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    obj = db.get_single_object(CollectionName.NEXARB_CONTENT.value, {"content_id": content.content_id})
    content_from_db = Content(**obj)
    if content_from_db is None:
        obj_id = db.insert_object(CollectionName.NEXARB_CONTENT.value, content.__dict__)
        if obj_id is None:
            return return_error_message(db, ErrorCode.NOT_INSERTED)
        return return_success_response()
    return return_error_message(db, ErrorCode.CONTENT_ID_IS_ALREADY_EXISTS)


@router.get("/content/{content_id}")
def get_content(
        content_id: str,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[])],
        db: Database = Depends(get_db)
):
    obj = db.get_single_object(CollectionName.NEXARB_CONTENT.value, {"content_id": content_id})
    content = Content(**obj)
    if content is None:
        return return_error_message(db, ErrorCode.OBJECT_NOT_FOUND)
    else:
        return return_success_response_with_data(content)


@router.delete("/content/{content_id}")
def delete_content(
        content_id: str,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    obj = db.delete_object(CollectionName.NEXARB_CONTENT.value, {"content_id": content_id})
    if obj == 0:
        return return_error_message(db, ErrorCode.OBJECT_NOT_FOUND)
    else:
        return return_success_response()


@router.put("/content")
def update_content(
        content: Content,
        current_user: Annotated[User, Security(get_current_user
            , scopes=[UserScopes.ADMIN_EDIT.value, UserScopes.ADMIN_REVIEW.value])],
        db: Database = Depends(get_db)
):
    obj = db.update_object(CollectionName.NEXARB_CONTENT.value, {"content_id": content.content_id},
                           {"content": content.content})
    if obj == 0:
        return return_error_message(db, ErrorCode.OBJECT_NOT_FOUND)
    else:
        return return_success_response()


@router.get("/contents")
def get_all_contents(
        current_user: Annotated[User, Security(get_current_user
            , scopes=[])],
        db: Database = Depends(get_db)
):
    return return_success_response_with_data(db.get_object(CollectionName.NEXARB_CONTENT.value))


@router.get("/error/messages")
def get_all_error_messages(
        current_user: Annotated[User, Security(get_current_user
            , scopes=[])],
        db: Database = Depends(get_db)
):
    return return_success_response_with_data(db.get_object(CollectionName.ERROR_MESSAGES.value))
