from typing import T, Union

from app.utils.error_handler.error_codes import ErrorCode
from app.utils.error_handler.response_handler import return_error_message
from app.utils.logger.logger import logger
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database
from app.utils.notification.data import OTPNotification, NotificationReasons, OfferNotification
from app.utils.notification.offer_notification import send_notification_for_offer
from app.utils.notification.otp_notification import send_notification_for_otp


def send_notification_to_user(
        db: Database,
        username: str,
        data: Union[OTPNotification, OfferNotification],
        reason: NotificationReasons
):
    try:
        user = db.get_object(CollectionName.USER.value, {"username": username})[0]
        if user["notification_type"] != "" or user["notification_type"] is not None:
            if reason == NotificationReasons.OFFER.value:
                return send_notification_for_offer(user["notification_type"], user["notification_identifier"], data)
            elif reason == NotificationReasons.OTP.value:
                return send_notification_for_otp(user["otp_type"], user["otp_identifier"], data)
            elif reason == NotificationReasons.PASSWORD_RESET_REQUEST.value:
                return send_notification_for_otp(user["otp_type"], user["otp_identifier"], data)
        else:
            logger.warning("User doesn't have any notification type")
            return return_error_message(db, ErrorCode.MISSING_USER_PREF_FOR_NOTIFICATION)
    except:
        return return_error_message(db, ErrorCode.EMAIL_SENT_ERROR)
