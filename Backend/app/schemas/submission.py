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
    correct_answer: str
    answers: list[StudentAnswerResult]

class SessionResultResponse(BaseModel):
    pin: str
    results: list[QuestionResult]

class StudentSummary(BaseModel):
    student_name: str
    submitted_count: int
    correct_count: int
    score: int


class SessionStudentsResponse(BaseModel):
    pin: str
    students: list[StudentSummary]

class SessionLeaderboardResponse(BaseModel):
    pin: str
    students: list[StudentSummary]