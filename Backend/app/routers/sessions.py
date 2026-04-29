from fastapi import APIRouter, status, HTTPException
from app.schemas.session import (
    CreateSessionResponse, 
    JoinSessionRequest,
    JoinSessionResponse
    )

from app.services import session_service

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)

@router.post("", response_model=CreateSessionResponse, status_code=status.HTTP_201_CREATED)
def create_new_session():
    return session_service.create_session()

@router.post("/join", response_model=JoinSessionResponse, status_code=status.HTTP_200_OK)
def join_existing_sessions(data: JoinSessionRequest):
    result = session_service.join_session(data.pin, data.student_name)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="session not found"
        )
    
    return result
