from app.api.data.general import BaseResponse
from app.utils.constants.collection_name import CollectionName
from app.utils.database.database import Database
from app.utils.error_handler.error_codes import ErrorCode
from app.utils.error_handler.error_data import CustomError


def return_error_message(
        db: Database,
        error: ErrorCode
) -> BaseResponse[dict]:
    error_objs = db.get_object(
        CollectionName.ERROR_MESSAGES.value,
        {
            "error_code": error.value
        }
    )
    if len(error_objs) == 0:
        return BaseResponse[dict](error=True, data={"data": CustomError(go_back=True, error_message="Unknown error")},
                                  error_code=error.value)
    return BaseResponse[dict](error=True, data={"data": CustomError(**error_objs[0])}, error_code=error.value)
