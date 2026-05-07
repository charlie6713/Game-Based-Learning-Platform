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
        "current_question_id": session_questions[0]["id"]
    }

    return {
        "pin": pin,
        "message": "Session created"
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
    current_question_id = session["current_question_id"]

    for question in session["questions"]:
        if question["id"] == current_question_id:
            return question

    return None


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
