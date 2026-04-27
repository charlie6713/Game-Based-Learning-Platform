from fastapi import APIRouter, status
from app.schemas.session import CreateSessionResponse
from app.services.session_service import create_session

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)

@router.post("", response_model=CreateSessionResponse, status_code=status.HTTP_201_CREATED)
def create_new_session():
    return create_session()