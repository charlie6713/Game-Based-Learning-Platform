from pydantic import BaseModel
from app.schemas.question import CreateSessionQuestion

class CreateSessionResponse(BaseModel):
    pin: str
    message: str

class JoinSessionRequest(BaseModel):
    pin: str
    student_name: str

class JoinSessionResponse(BaseModel):
    pin: str
    student_name: str
    message: str

class CreateSessionRequest(BaseModel):
    questions: list[CreateSessionQuestion]

class SessionStatusResponse(BaseModel):
    pin: str
    status: str

class StartSessionResponse(BaseModel):
    pin: str
    status: str
    message: str

class NextQuestionResponse(BaseModel):
    pin: str
    current_question_index: int
    question_id: int
    message: str