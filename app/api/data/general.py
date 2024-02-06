from enum import Enum
from typing import TypeVar, Generic, List
from pydantic import BaseModel

from app.utils.logger.logger import logger

T = TypeVar('T')


class BaseResponse(BaseModel, Generic[T]):
    error: bool
    data: T
    error_code: int


class UpdateWay(Enum):
    UP = "up"
    DOWN = "down"


class Content(BaseModel):
    content: str
    content_id: str


def return_success_response() -> BaseResponse[dict]:
    return BaseResponse[dict](error=False, data={"data": "success"}, error_code=-1)


def include_id_if_exists(data: List[T]) -> List[T]:
    for obj in data:
        try:
            if hasattr(obj, "_id") or obj["_id"] is not None:
                obj["id"] = str(obj["_id"])
        except Exception as e:
            logger.error(e)
    return data


def return_success_response_with_data(data: T) -> BaseResponse[T]:
    is_list = True
    if type(data) is list:
        data = include_id_if_exists(data)
    else:
        is_list = False
        data = include_id_if_exists([data])
    return BaseResponse[T](error=False, data=data if is_list else data[0], error_code=-1)
