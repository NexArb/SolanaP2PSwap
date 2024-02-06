from enum import Enum
from typing import Optional, List

from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    password: str


class LoginData(BaseModel):
    access_token: str
    token_type: str


class NotificationTypes(Enum):
    EMAIL = "Email"
    DISCORD = "Discord"
    SLACK = "Slack"
    ONCHAIN = "Onchain"


class User(UserBase):
    wallet_address: Optional[str] = None
    notification_type: Optional[str] = None
    notification_identifier: Optional[str] = None
    otp_type: Optional[str] = None
    otp_identifier: Optional[str] = None
    disabled: Optional[bool] = None
    scopes: List[str] = []


class SetNotificationTypeRequest(BaseModel):
    notification_type: str
    notification_identifier: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    scopes: List[str] = []


class SetOTP(BaseModel):
    otp_type: str
    otp_identifier: str
