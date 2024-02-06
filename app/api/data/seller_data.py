from pydantic import BaseModel


class Seller(BaseModel):
    username: str
    wallet_address: str


class SellerPostRequest(BaseModel):
    wallet_address: str
    balance: float