from pydantic import BaseModel

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