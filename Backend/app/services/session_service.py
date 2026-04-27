from app.utils.pin import generate_pin
from app.storage.memory import sessions

def create_session() -> dict:
    pin = generate_pin()

    if pin in sessions:
        pin = generate_pin()
    
    sessions[pin] = {
        "pin": pin,
        "student": [],
        "submissions": []
    }

    return {
        "pin": pin,
        "message": "session created"
    }