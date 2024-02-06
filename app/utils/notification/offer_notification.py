from enum import Enum

from app.utils.constants.environment_keys import EnvironmentKeys
from app.utils.environment.environment_manager import EnvironmentManager
from app.utils.logger.logger import logger
from app.api.data.auth_data import NotificationTypes
from discord_webhook import DiscordWebhook, DiscordEmbed
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.utils.notification.data import NotificationMessage, OfferNotification, EmailMissingKeysException


# TODO add email template
# TODO add notification reason



def send_notification_for_offer(notification_type: str, notification_identifier: str, data: OfferNotification):
    if notification_type == NotificationTypes.EMAIL.value:
        __send_email_notification__(notification_identifier, data)
    elif notification_type == NotificationTypes.SLACK.value:
        __send_slack_notification__(notification_identifier)
    elif notification_type == NotificationTypes.DISCORD.value:
        __send_discord_notification__(notification_identifier, data)
    else:
        logger.error("Notification type is presented wrongly")


def __send_discord_notification__(notification_identifier: str, data: OfferNotification):
    webhook = DiscordWebhook(url=notification_identifier, content="P2P message")
    embed = DiscordEmbed(title="You have an update for P2P", description="", color="03b2f8")
    embed.add_embed_field(name="Message", value=data.message, inline=False)
    embed.add_embed_field(name="Offer Comes From", value=data.offer_comes_from, inline=False)
    embed.add_embed_field(name="Offer Status", value=data.offer_status, inline=False)
    webhook.add_embed(embed)
    response = webhook.execute()
    logger.info(response.__dict__)


def __send_slack_notification__(notification_identifier: str):
    # TODO will be implemented later
    pass


def __send_email_notification__(notification_identifier: str, data: OfferNotification):
    env_map = EnvironmentManager()
    if env_map.get_key(EnvironmentKeys.EMAIL.value) is None or env_map.get_key(
            EnvironmentKeys.EMAIL_PASSWORD.value) is None:
        logger.error("Email or password keys in environment are missing or are named wrongly")
        raise EmailMissingKeysException("Email server cannot be initialized")
    message = MIMEMultipart()
    message["To"] = notification_identifier
    message["From"] = env_map.get_key(EnvironmentKeys.EMAIL.value)
    message["Subject"] = 'P2P Notification'

    title = '<b> Title line here. </b>'
    message_text = MIMEText('''Message body goes here.''', 'html')
    message.attach(MIMEText(title, 'html'))
    message.attach(message_text)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(env_map[EnvironmentKeys.EMAIL.value], env_map[EnvironmentKeys.EMAIL_PASSWORD.value])
        smtp_server.sendmail(env_map[EnvironmentKeys.EMAIL.value], notification_identifier, message.as_string())
    logger.info("Message sent!")
