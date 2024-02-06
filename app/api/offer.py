from typing import List

from bson import ObjectId
from typing_extensions import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.api.data.auth_data import User
from app.api.data.general import return_success_response, BaseResponse, return_success_response_with_data, UpdateWay
from app.api.data.offer_data import ApproveOffer, Offer, CreateOfferRequest, UpdateOffer, OfferStatus
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database, get_db
from app.utils.logger.logger import logger
from app.utils.notification.data import NotificationMessage
from app.utils.notification.user_notification import send_notification_to_user
from app.utils.security.authenticate import get_current_user

router = APIRouter(prefix="/offer", tags=["Offer"])


@router.post("/approve", response_model=BaseResponse[dict])
def approve_offer(
        approve_body: ApproveOffer,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    offers = db.get_object(CollectionName.OFFERS.value, {"_id": ObjectId(approve_body.id), "is_active": True})
    if offers is None or len(offers) == 0:
        raise HTTPException(status_code=400, detail="Database error")
    offer: Offer = offers[0]
    if offer["coming_from"] == current_user["username"]:
        raise HTTPException(status_code=400, detail="Database error")
    updated_count = db.update_object(CollectionName.OFFERS.value,
                                     {"_id": ObjectId(approve_body.id)},
                                     {"is_approved": True, "is_active": False})
    #TODO deploy a escrow contract
    if updated_count == 0:
        raise HTTPException(status_code=400, detail="Database error")
    return return_success_response()


@router.get("/my", response_model=BaseResponse[List[Offer]])
def get_my_offers(
        current_user: Annotated[User, Depends(get_current_user)],
        pastOffers: bool = False,
        db: Database = Depends(get_db),
):
    offers = db.get_object(CollectionName.OFFERS.value,
                           {
                               "buyer_username": current_user["username"],
                               "is_active": not pastOffers
                           }
                           )
    return return_success_response_with_data(data=offers)


@router.post("", response_model=BaseResponse[dict])
def create_offer(
        offer_request: CreateOfferRequest,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    old_requests = db.get_object(CollectionName.OFFERS.value,
                                 {
                                     "seller_username": offer_request.seller_username,
                                     "buyer_username": current_user["username"],
                                     "is_active": True
                                 }
                                 )
    if len(old_requests) != 0:
        raise HTTPException(status_code=400, detail="Database error")

    listing_of_the_user = db.get_object(CollectionName.LISTING.value,
                                        {
                                            "user_id": str(current_user["_id"])
                                        }
                                        )
    if len(listing_of_the_user) != 0:
        raise HTTPException(status_code=400, detail="You cannot create offer to your listing!!")

    offer_object = Offer(
        user_id=str(current_user["_id"]),
        buyer_username=current_user["username"],
        seller_username=offer_request.seller_username,
        listing_id=offer_request.listing_id,
        amount=offer_request.amount,
        total_price=0,  # TODO Total price will be taken from price oracle, redstone
        updates=[],
        coming_from=current_user["username"],
        is_approved=False,
        is_deleted=False,
        is_active=True
    )
    obj_id = db.insert_object(CollectionName.OFFERS.value, offer_object.__dict__)
    if obj_id is None:
        raise HTTPException(status_code=400, detail="Database error")
    try:
        send_notification_to_user(db,
                                  offer_request.seller_username,
                                  NotificationMessage(
                                      message="A new offer exists",
                                      subject="Offer comes"
                                  )
                                  )
    except Exception as e:
        logger.error(e)
    return return_success_response()


@router.delete("/{offer_id}", response_model=BaseResponse[dict])
def delete_offer(
        offer_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    offers = db.get_object(CollectionName.OFFERS.value,
                           {
                               "buyer_username": current_user["username"],
                               "_id": ObjectId(offer_id),
                               "is_active": True
                           }
                           )
    if len(offers) != 1:
        raise HTTPException(status_code=400, detail="Database error")
    deleted_offer_count = db.delete_object(CollectionName.OFFERS.value,
                                           {
                                               "buyer_username": current_user["username"],
                                               "_id": ObjectId(offer_id),
                                               "is_active": True
                                           }
                                           )
    return return_success_response_with_data(data={"deleted_count": deleted_offer_count})


@router.put("/reject/{offer_id}", response_model=BaseResponse[dict])
def reject_offer(
        offer_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    offers = db.get_object(CollectionName.OFFERS.value,
                          {
                              "_id": ObjectId(offer_id),
                              "is_active": True
                          }
                          )
    if not offers:
        raise HTTPException(status_code=404, detail="Offer not found or already inactive")
    listing_id = offers[0].get('listing_id')
    listing = db.get_single_object(CollectionName.LISTING.value,
                                   {"_id": ObjectId(listing_id)})

    if not listing or listing.get('user_id') != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="You do not have permission to reject this offer")

    updated_object_count = db.update_object(
        CollectionName.OFFERS.value,
        {
            "_id": ObjectId(offer_id)
        },
        {
            "status": OfferStatus.REJECTED.value
        }
    )
    if updated_object_count != 1:
        raise HTTPException(status_code=400, detail="Could not rejected!!")
    return return_success_response()


@router.put("/update", response_model=BaseResponse[dict])
def update_offer(
        update_data: UpdateOffer,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Database = Depends(get_db),
):
    offers = db.get_object(CollectionName.OFFERS.value,
                           {
                               "$or": [{"buyer_username": current_user["username"]},
                                       {"seller_username": current_user["username"]}],
                               "_id": ObjectId(update_data.offer_id),
                               "is_active": True
                           }
                           )
    if len(offers) != 1:
        raise HTTPException(status_code=400, detail="Database error")
    offer = Offer(**offers[0])
    if update_data.update_way == UpdateWay.UP.value:
        offer.amount += update_data.amount
    elif update_data.update_way == UpdateWay.DOWN.value:
        offer.amount -= update_data.amount
    offer.updates.append(update_data.__dict__)
    offer.coming_from = current_user["username"]
    updated_count = db.update_object(
        CollectionName.OFFERS.value,
        {"_id": ObjectId(update_data.offer_id)},
        offer.__dict__
    )
    if updated_count != 1:
        raise HTTPException(status_code=400, detail="Database error")
    notification_receiver_username, offer_coming_from = (offer.seller_username, offer.buyer_username) \
        if current_user["username"] == offer.buyer_username \
        else (offer.buyer_username, offer.seller_username)
    try:
        send_notification_to_user(db,
                                  notification_receiver_username,
                                  NotificationMessage(
                                      message="Offer is updated",
                                      offer_status="Update",
                                      offer_comes_from=offer_coming_from
                                  )
                                  )
    except Exception as e:
        logger.error(e)
    return return_success_response()
