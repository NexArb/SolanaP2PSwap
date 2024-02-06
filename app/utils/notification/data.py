from enum import Enum


class NotificationMessage:
    message: str
    subject: str

    def __init__(self, message: str, subject: str):
        self.message = message
        self.subject = subject


class OTPNotification(NotificationMessage):
    otp_code: str

    def __init__(self, message: str, subject: str, otp_code: str):
        super().__init__(message, subject)
        self.otp_code = otp_code


class OfferNotification(NotificationMessage):
    offer_comes_from: str
    offer_status: str

    def __init__(self, message: str, subject: str, offer_comes_from: str, offer_status: str):
        super().__init__(message, subject)
        self.offer_status = offer_status
        self.offer_comes_from = offer_comes_from


class EmailMissingKeysException(Exception):
    pass


class NotificationReasons(Enum):
    OFFER = "OFFER"
    OTP = "OTP"
    PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST"
