from typing import List, Dict

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from typing_extensions import Annotated

from app.api.data.auth_data import User
from app.api.data.general import BaseResponse, return_success_response, return_success_response_with_data, UpdateWay
from app.api.data.listing_data import Listing, CreateListingRequest, UpdateListing
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import get_db, Database
from app.utils.security.authenticate import get_current_user

router = APIRouter(prefix="/listing", tags=["Listing"])


@router.post("",response_model=BaseResponse[Dict])
def create_listing(
        listing: CreateListingRequest,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    obj = db.get_object(CollectionName.LISTING.value,
                        {
                            "user_id": current_user["_id"],
                            "seller_username": current_user["username"],
                            "currency": listing.currency,
                            "is_active": True,
                            "is_deleted": False
                        })
    if len(obj) != 0:
        raise HTTPException(status_code=400, detail="Database error")
    listing_dict = Listing(
        user_id=str(current_user["_id"]),
        seller_username=current_user["username"],
        amount=listing.amount,
        currency=listing.currency,
        is_deleted=False,
        is_active=True,
        total_price=0.0
    ).__dict__
    obj_id = db.insert_object(CollectionName.LISTING.value, listing_dict)
    if obj_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    return return_success_response()


@router.get("/{listing_id}", response_model=BaseResponse[List[Listing]])
def get_listing(
        listing_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    listings = db.get_object(CollectionName.LISTING.value, {"_id": ObjectId(listing_id)})
    return return_success_response_with_data(listings)


@router.get("", response_model=BaseResponse[List[Listing]])
def get_listings(
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    listings = db.get_object(CollectionName.LISTING.value)
    return return_success_response_with_data(listings)


@router.delete("{listing_id}", response_model=BaseResponse[dict])
def delete_listing(
        listing_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    listings = db.get_object(CollectionName.LISTING.value,
                             {
                                 "seller_username": current_user.username,
                                 "_id": ObjectId(listing_id),
                                 "is_active": True
                             }
                             )
    if len(listings) != 1:
        raise HTTPException(status_code=400, detail="Database error")
    deleted_offer_count = db.delete_object(CollectionName.LISTING.value,
                                           {
                                               "seller_username": current_user.username,
                                               "_id": ObjectId(listing_id),
                                               "is_active": True
                                           }
                                           )
    if deleted_offer_count == 0:
        raise HTTPException(status_code=400, detail="Database error")
    return return_success_response()


@router.put("/update")
def update_listing(
        update_data: UpdateListing,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    listings = db.get_object(CollectionName.LISTING.value,
                             {
                                 "seller_username": current_user["username"],
                                 "_id": ObjectId(update_data.id),
                                 "is_active": True
                             }
                             )
    if len(listings) != 1:
        raise HTTPException(status_code=400, detail="Database error")
    listing = Listing(**listings[0])
    if update_data.update_way == UpdateWay.UP.value:
        listing.amount += update_data.amount
    elif update_data.update_way == UpdateWay.DOWN.value:
        listing.amount -= update_data.amount
    updated_count = db.update_object(CollectionName.LISTING.value, {"_id": ObjectId(update_data.id)},
                                     listing.__dict__)
    if updated_count != 1:
        raise HTTPException(status_code=400, detail="Database error")
    return return_success_response()
