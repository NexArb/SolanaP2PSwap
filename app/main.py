from fastapi import FastAPI

from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, offer, listings, admin, smart_contract,bridge
from app.utils.logger.logger import logger
from app.websocket import message

app = FastAPI(
    title="API Project",
    description="Work in progress",
    version='0.1',
    swagger_ui_parameters={"docExpansion": "none"},
)

routers = [
    auth.router,
    listings.router,
    offer.router,
    message.router,
    admin.router,
    smart_contract.router,
    bridge.router
]

for router in routers:  # routers_test
    app.include_router(router)

app.add_middleware(CORSMiddleware,allow_methods=["*"],allow_headers=["*"],allow_credentials=True)

@app.on_event("startup")
async def startup_event():
    logger.info("API STARTED, docs at /docs#")


if __name__ == "__main__":
    """
    https://github.com/tiangolo/fastapi/issues/1508
    """
    import uvicorn

    load_dotenv()
    uvicorn.run(app, host="0.0.0.0", port=8080)
