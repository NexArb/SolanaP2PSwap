from fastapi import APIRouter, Depends, HTTPException

from app.api.data.general import BaseResponse

router = APIRouter(prefix="/smart_contract", tags=["Smart Contract"])


@router.post("/sign/{user_id}", response_model=BaseResponse[dict])
def sign_contract_for_user(
        user_id: str
):
    raise HTTPException(status_code=500, detail="Not implemented")