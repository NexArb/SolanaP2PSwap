from enum import Enum
import pyotp
from app.utils.constants.environment_keys import EnvironmentKeys
from app.utils.environment.environment_manager import EnvironmentManager, get_environment_manager


def generate_otp(
        env_manager: EnvironmentManager,
        interval=60 * 2  # second base
) -> str:
    totp = pyotp.TOTP(env_manager.get_key(EnvironmentKeys.OTP_SECRET.value), interval=interval)
    return totp.now()


def verify_otp(
        otp: str,
        env_manager: EnvironmentManager,
        interval=60 * 2  # second base
) -> bool:
    totp = pyotp.TOTP(env_manager.get_key(EnvironmentKeys.OTP_SECRET.value), interval=interval)
    return totp.verify(otp)


class OTPType(Enum):
    EMAIL = "Email"
    ONCHAIN = "Onchain"
