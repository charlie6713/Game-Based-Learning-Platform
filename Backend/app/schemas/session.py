from pydantic import BaseModel

class CreateSessionResponse(BaseModel):
    pin: str
    message: str