from typing import Dict
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from typing_extensions import Annotated

from app.api.data.auth_data import User
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database
from app.utils.security.authenticate import get_current_user

# This will hold WebSocket connections for each user_id
connections: Dict[str, WebSocket] = {}


# Model for a message, for simplicity, we are not using Pydantic models here
class Message:
    def __init__(self, sender_username: int, receiver_username: int, content: str):
        self.sender_username = sender_username
        self.receiver_username = receiver_username
        self.content = content


router = APIRouter(prefix="/message", tags=["Message"])


@router.websocket("/ws/{offer_id}")
async def websocket_endpoint(
        websocket: WebSocket,
        offer_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
):
    db = Database("platform")
    offers = db.get_object(
        CollectionName.OFFERS.value,
        {"_id": offer_id,
         "$or": [
             {"seller_username": current_user["username"]},
             {"buyer_username": current_user["username"]}
         ]
         }
    )
    if len(offers) != 1:
        raise HTTPException(status_code=400, detail="Offer cannot be found")
    await websocket.accept()
    connections[offers[0]["_id"]] = websocket
    try:
        while True:
            data = await websocket.receive_text()
            # Assuming data is in the format "receiver_id:content"
            receiver_id, content = data.split(":", 1)
            receiver_id = int(receiver_id)  # Convert to int
            message = Message(
                sender_username=current_user["username"],
                receiver_username= offers[0]["seller_username"]
                if offers[0]["seller_username"] == current_user["username"]
                else offers[0]["buyer_username"],
                content=content
            )
            # TODO save the message to database
            # Send the message to the receiver if they're connected
            receiver_ws = connections.get(offers[0]["_id"])
            if receiver_ws:
                await receiver_ws.send_text(f"User {message.sender_username} says: {message.content}")
            else:
                # Handle case where receiver is not connected
                pass
    except WebSocketDisconnect:
        connections.pop(offer_id, None)
        # When user disconnects, save messages to the database
        # save_to_database(messages)
