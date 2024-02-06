from enum import Enum
from typing import Any, Optional, List, Dict

from pydantic import BaseModel
from bson.objectid import ObjectId


class CreateOfferRequest(BaseModel):
    listing_id: str
    seller_username: str
    amount: float


class UpdateOffer(BaseModel):
    offer_id: str
    update_way: str
    amount: float
    updated_by: str


class OfferStatus(Enum):
    ONGOING = "ONGOING"
    REJECTED = "REJECTED"


class Offer(BaseModel):
    user_id: Optional[str] = None
    status: Optional[str] = None
    listing_id: str
    seller_username: str
    buyer_username: str
    amount: float
    currency_symbol: str
    total_price: float
    coming_from: str
    updates: List[Dict]
    is_deleted: bool
    is_active: bool
    is_approved: bool


class ApproveOffer(BaseModel):
    id: str
