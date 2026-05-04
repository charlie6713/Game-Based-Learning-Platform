from fastapi import APIRouter, status, HTTPException
from app.schemas.session import (
    CreateSessionResponse, 
    JoinSessionRequest,
    JoinSessionResponse
    )

from app.schemas.submission import (
    SubmitAnswerRequest,
    SubmitAnswerResponse,
    SessionResultResponse
)

from app.schemas.question import (
    TutorQuestionResponse,
    StudentQuestionResponse
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
def join_existing_session(data: JoinSessionRequest):
    result = session_service.join_session(data.pin, data.student_name)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="session not found"
        )
    
    return result

@router.get("/{pin}/tutor/question", response_model=TutorQuestionResponse, status_code=status.HTTP_200_OK)
def get_question_for_tutor(pin: str):
    result = session_service.get_tutor_question(pin)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="session not found"
        )
    return result

@router.get("/{pin}/student/question", response_model=StudentQuestionResponse, status_code=status.HTTP_200_OK)
def get_question_for_student(pin: str):
    result = session_service.get_student_question(pin)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="session not found"
        )
    return result

@router.post("/{pin}/submit", response_model=SubmitAnswerResponse, status_code=status.HTTP_200_OK)
def submit_answer(pin: str, request: SubmitAnswerRequest):
    result = session_service.submit_answer(pin=pin, student_name=request.student_name, question_id=request.question_id, answer=request.answer)

    if result is None:
        raise HTTPException(
           status_code=status.HTTP_404_NOT_FOUND,
           detail= "session not found"
        )
    
    if result.get("error") == "student_not_joined":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student has not joined this session"
        )
    
    if result.get("error") == "question_not_found":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    
    if result.get("error") == "question_mismatch":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question does not match current question"
        )
    
    return result

@router.get("/{pin}/results", response_model=SessionResultResponse, status_code=status.HTTP_200_OK)
def get_session_results(pin: str):
    result = session_service.get_session_results(pin)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="session not found"
        )
    
    return result