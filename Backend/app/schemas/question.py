from pydantic import BaseModel

class StudentQuestionResponse(BaseModel):
    id: int
    text: str
    options: list[str]

class TutorQuestionResponse(BaseModel):
    id: int
    text: str
    options: list[str]
    answer: str

class CreateSessionQuestion(BaseModel):
    id: int
    text: str
    options: list[str]
    answer: str

