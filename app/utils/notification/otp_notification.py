import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.api.data.auth_data import NotificationTypes
from app.utils.constants.environment_keys import EnvironmentKeys
from app.utils.environment.environment_manager import EnvironmentManager
from app.utils.logger.logger import logger
from app.utils.notification.data import OTPNotification, EmailMissingKeysException


def send_notification_for_otp(notification_type: str, notification_identifier: str, data: OTPNotification):
    if notification_type.lower() == NotificationTypes.EMAIL.value.lower():
        __send_email_notification__(notification_identifier, data)
    elif notification_type == NotificationTypes.ONCHAIN.value:
        pass
        # TODO Onchain notification
    else:
        logger.error("Notification type is presented wrongly")


def __send_discord_notification__(notification_identifier: str, data: OTPNotification):
    # TODO will be implemented later
    pass


def __send_slack_notification__(notification_identifier: str):
    # TODO will be implemented later
    pass


def __send_email_notification__(notification_identifier: str, data: OTPNotification):
    env_map = EnvironmentManager()
    if env_map.get_key(EnvironmentKeys.EMAIL.value) is None or env_map.get_key(
            EnvironmentKeys.EMAIL_PASSWORD.value) is None:
        logger.error("Email or password keys in environment are missing or are named wrongly")
        raise EmailMissingKeysException("Email server cannot be initialized")
    message = MIMEMultipart()
    message["To"] = notification_identifier
    message["From"] = env_map.get_key(EnvironmentKeys.EMAIL.value)
    message["Subject"] = 'OTP Code'

    title = '<h2> Your OTP Code </h2>'
    message_text = MIMEText(''' 
        <main> 
          <div>
            ''' + data.message + '''
          </div>
          <div>
            ''' + data.otp_code + '''
          </div>
        </main> 
     ''', 'html')
    message.attach(MIMEText(title, 'html'))
    message.attach(message_text)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(
            env_map.get_key(EnvironmentKeys.EMAIL.value),
            env_map.get_key(EnvironmentKeys.EMAIL_PASSWORD.value)
        )
        smtp_server.sendmail(
            env_map.get_key(EnvironmentKeys.EMAIL.value),
            notification_identifier,
            message.as_string()
        )
    logger.info("Message sent!")

