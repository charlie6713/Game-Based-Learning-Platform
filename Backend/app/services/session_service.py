import copy

from app.utils.pin import generate_pin
from app.storage.memory import sessions



def create_session(questions: list[dict]) -> dict:
    pin = generate_pin()

    while pin in sessions:
        pin = generate_pin()

    session_questions = copy.deepcopy(questions)

    sessions[pin] = {
        "pin": pin,
        "students": [],
        "submissions": {},  
        "questions": session_questions,
        "current_question_index": 0,
        "status" : "waiting"
    }

    return {
        "pin": pin,
        "message": "Session created"
    }

def start_session(pin: str):
    if pin not in sessions:
        return None
    
    sessions[pin]["status"] = "started"

    return {
        "pin": pin,
        "status": "started",
        "message": "Session started"
    }

def get_session_status(pin: str):
    if pin not in sessions:
        return None
    
    session = sessions[pin]
    
    return {
        "pin": pin,
        "status": session["status"]
    }

def join_session(pin: str, student_name: str):
    if pin not in sessions:
        return None

    if student_name not in sessions[pin]["students"]:
        sessions[pin]["students"].append(student_name)

    return {
        "pin": pin,
        "student_name": student_name,
        "message": "Joined session"
    }


def get_student_question(pin: str):
    if pin not in sessions:
        return None

    session = sessions[pin]
    question = _get_current_question(session)

    if question is None:
        return None

    return {
        "id": question["id"],
        "text": question["text"],
        "options": question["options"]
    }

    
def get_tutor_question(pin: str):
    if pin not in sessions:
        return None

    session = sessions[pin]
    question = _get_current_question(session)

    if question is None:
        return None

    return {
        "id": question["id"],
        "text": question["text"],
        "options": question["options"],
        "answer": question["answer"]
    }


def submit_answer(pin: str, student_name: str, question_id: int, answer: str):
    if pin not in sessions:
        return None

    session = sessions[pin]

    if student_name not in session["students"]:
        return {
            "error": "student_not_joined"
        }

    current_question = _get_current_question(session)

    if current_question is None:
        return {
            "error": "question_not_found"
        }

    if question_id != current_question["id"]:
        return {
            "error": "question_mismatch"
        }

    is_correct = answer == current_question["answer"]

    submission = {
        "student_name": student_name,
        "question_id": question_id,
        "submitted_answer": answer,
        "is_correct": is_correct
    }

    _save_or_update_submission(session, submission)

    return {
        "pin": pin,
        "student_name": student_name,
        "question_id": question_id,
        "submitted_answer": answer,
        "is_correct": is_correct,
        "message": "Answer submitted"
    }


def get_session_results(pin: str):
    if pin not in sessions:
        return None

    session = sessions[pin]
    results = []

    for question in session["questions"]:
        question_id = question["id"]

        question_submissions = session["submissions"].get(question_id, {})

        answers = []

        for submission in question_submissions.values():
            answers.append({
                "student_name": submission["student_name"],
                "submitted_answer": submission["submitted_answer"],
                "is_correct": submission["is_correct"]
            })

        results.append({
            "question_id": question_id,
            "question_text": question["text"],
            "correct_answer": question["answer"],
            "answers": answers
        })

    return {
        "pin": pin,
        "results": results
    }


def _get_current_question(session: dict):
    current_question_index = session["current_question_index"]
    questions = session["questions"]

    if current_question_index < 0 or current_question_index >= len(questions):
        return None

    return questions[current_question_index]


def _save_or_update_submission(session: dict, submission: dict):
    question_id = submission["question_id"]
    student_name = submission["student_name"]

    if question_id not in session["submissions"]:
        session["submissions"][question_id] = {}

    session["submissions"][question_id][student_name] = submission


def get_session_students(pin: str):
    if pin not in sessions:
        return None

    session = sessions[pin]
    students = []

    for student_name in session.get("students", []):
        submitted_count = 0
        correct_count = 0

        # submissions are stored as:
        # {question_id: {student_name: submission_dict}}
        for question_submissions in session.get("submissions", {}).values():
            submission = question_submissions.get(student_name)

            if submission is None:
                continue

            submitted_count += 1

            if submission.get("is_correct") is True:
                correct_count += 1

        student_info = {
            "student_name": student_name,
            "submitted_count": submitted_count,
            "correct_count": correct_count,
            "score": correct_count
        }

        students.append(student_info)

    return {
        "pin": pin,
        "students": students
    }


def next_session_question(pin: str):
    if pin not in sessions:
        return None

    session = sessions[pin]
    questions = session["questions"]
    current_question_index = session["current_question_index"]

    if current_question_index >= len(questions) - 1:
        return {
            "error": "no_more_questions"
        }

    session["current_question_index"] += 1
    question = _get_current_question(session)

    return {
        "pin": pin,
        "current_question_index": session["current_question_index"],
        "question_id": question["id"],
        "message": "Moved to next question"
    }
