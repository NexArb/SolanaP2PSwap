from typing_extensions import Annotated
from fastapi import APIRouter, Depends, HTTPException
from app.api.data.auth_data import User
from app.api.data.seller_data import SellerPostRequest
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import get_db, Database
from app.utils.security.authenticate import get_current_user

router = APIRouter(prefix="/seller", tags=["Seller"])


@router.post("apply")
def apply_for_being_seller(
        seller_request: SellerPostRequest,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    # TODO Balance should be checked
    # connection_string = dotenv_values(".env")
    # if connection_string[EnvironmentKeys.RPC_ENDPOINT.value] is None:
    #    raise HTTPException(status_code=400, detail="Incorrect username or password")
    # w3 = Web3(Web3.HTTPProvider(connection_string[EnvironmentKeys.RPC_ENDPOINT.value]))
    # balance = w3.eth.get_balance(Address(Web3.to_bytes(text=seller_request.wallet_address)))
    seller_dict = seller_request.__dict__
    seller_dict["user_id"] = current_user.username
    obj_id = db.insert_object(CollectionName.SELLER.value, seller_dict)
    if obj_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    return {"status": "OK"}
