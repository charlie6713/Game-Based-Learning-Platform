from app.utils.pin import generate_pin
from app.storage.memory import sessions

def create_session() -> dict:
    pin = generate_pin()

    while pin in sessions:
        pin = generate_pin()
    
    sessions[pin] = {
        "pin": pin,
        "students": [],
        "submissions": []
    }

    return {
        "pin": pin,
        "message": "session created"
    }

def join_session(pin: str, student_name: str):
    if pin not in sessions:
        return None
    
    sessions[pin]["students"].append(student_name)

    return {
        "pin": pin,
        "student_name": student_name,
        "message": "Joined session"
    }