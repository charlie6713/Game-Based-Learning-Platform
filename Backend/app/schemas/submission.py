from pydantic import BaseModel

class SubmitAnswerRequest(BaseModel):
    student_name: str
    question_id: int
    answer: str

class SubmitAnswerResponse(BaseModel):
    pin:str
    student_name: str
    question_id: int
    submitted_answer: str
    is_correct: bool
    message: str

class StudentAnswerResult(BaseModel):
    student_name: str
    submitted_answer: str
    is_correct: bool

class QuestionResult(BaseModel):
    question_id: int
    question_text: str
    question_answer: str
    answers: list[StudentAnswerResult]

class SessionResultResponse(BaseModel):
    pin: str
    results: list[QuestionResult]