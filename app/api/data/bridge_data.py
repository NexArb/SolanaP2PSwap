from typing import Optional

from pydantic import BaseModel


class CreateBridgeResponse(BaseModel):
    transaction_hash: str
    status: str


class CreateBridge(BaseModel):
    near_address: str
    target_contract_address: str
    user_email: str
    target_url: str
    chain_id: str
    username: Optional[str]
