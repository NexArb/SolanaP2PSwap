import json
import os
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from typing_extensions import Annotated
from web3.contract.contract import ContractFunction
from web3.types import TxReceipt, Wei

from app.api.data.auth_data import User
from app.api.data.bridge_data import CreateBridge, CreateBridgeResponse
from app.api.data.general import return_success_response_with_data
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database, get_db
from app.utils.environment.environment_manager import EnvironmentManager, get_environment_manager
from app.utils.error_handler.error_codes import ErrorCode
from app.utils.error_handler.response_handler import return_error_message
from app.utils.security.authenticate import get_current_user
from app.utils.smart_contracts.smart_contracts_utils import get_web3_object, get_bridge_contract_requirements, \
    get_gas_fee, create_transaction_and_sign

router = APIRouter(prefix="/bridge", tags=["Bridge"])


@router.post("create",response_model=CreateBridgeResponse)
def create_bridge(
        create_bridge_body: CreateBridge,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
        env_manager: EnvironmentManager = Depends(get_environment_manager),
):
    create_bridge_body.username = current_user["username"]
    obj_id = db.insert_object(CollectionName.BRIDGE.value, create_bridge_body.__dict__)
    if obj_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    web3 = get_web3_object(env_manager)
    with open(os.getcwd() + '/abi/Bridge.json', 'r') as abi_file:
        contract_abi = json.load(abi_file)
    contract_address, caller, private_key = get_bridge_contract_requirements(env_manager)
    if contract_address is not None and web3.is_address(
            contract_address) and caller is not None and private_key is not None:
        nonce = web3.eth.get_transaction_count(web3.to_checksum_address(caller))
        contract = web3.eth.contract(address=web3.to_checksum_address(contract_address), abi=contract_abi)
        call_function: ContractFunction = contract.functions.addUserContract(
            web3.to_checksum_address(create_bridge_body.user_email),
            web3.to_checksum_address(create_bridge_body.target_contract_address)
        )
        max_fee_per_gas = get_gas_fee(web3) + Wei(100000000000)
        tx_receipt: TxReceipt = create_transaction_and_sign(web3, call_function, max_fee_per_gas, private_key, nonce)
        response = CreateBridgeResponse()
        response.transaction_hash = tx_receipt["transactionHash"]
        response.status = tx_receipt["status"]
        return return_success_response_with_data(response)
    else:
        return return_error_message(db, ErrorCode.TARGET_ADDRESS_TYPE_WRONG)


@router.get("bridges", response_model=List[CreateBridge])
def get_my_bridge(
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    return return_success_response_with_data(
        db.get_object(
            CollectionName.BRIDGE.value,
            {"username": current_user["username"]}
        )
    )


@router.get("message/price", response_model=int)
def get_message_price(
        current_user: Annotated[User, Depends(get_current_user)],
        env_manager: EnvironmentManager = Depends(get_environment_manager),
):
    web3 = get_web3_object(env_manager)
    return
