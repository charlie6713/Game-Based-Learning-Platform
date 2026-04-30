from app.utils.pin import generate_pin
from app.storage.memory import sessions



DEFAULT_QUESTION = {
    "id": 1,
    "text": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4"
}


def create_session() -> dict:
    pin = generate_pin()

    while pin in sessions:
        pin = generate_pin()
    
    sessions[pin] = {
        "pin": pin,
        "students": [],
        "submissions": [],
        "current_question": DEFAULT_QUESTION
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

def get_student_question(pin: str):
    if pin not in sessions:
        return None

    question = sessions[pin]["current_question"]

    return{
        "id": question["id"],
        "text": question["text"],
        "options": question["options"]
    }

def get_tutor_question(pin: str):
    if pin not in sessions:
        return None
    
    question = sessions[pin]["current_question"]

    return {
        "id": question["id"],
        "text": question["text"],
        "options": question["options"],
        "answer": question["answer"]
    }