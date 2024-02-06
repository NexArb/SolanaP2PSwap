from typing import Optional

from bson import ObjectId
from pydantic import BaseModel


class CreateListingRequest(BaseModel):
    amount: float
    currency: str

class UpdateListing(BaseModel):
    id: Optional[str]
    amount: float
    update_way: str


class Listing(BaseModel):
    id: Optional[str]
    user_id: Optional[str]
    seller_username: str
    amount: float
    total_price: float
    currency: str
    is_deleted: bool
    is_active: bool
