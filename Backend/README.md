# Backend

This folder contains the FastAPI backend for the Game-Based Learning Platform MVP.

## Purpose

The backend is responsible for:

- creating tutor sessions
- generating and managing session PINs
- handling student joins
- separating tutor and student question payloads
- receiving student answer submissions
- moving the session to the next question
- keeping session state in memory

## Tech Stack

- Python
- FastAPI
- Pydantic
- Uvicorn

## Main Structure

```text
Backend/
|-- app/
|   |-- routers/
|   |-- schemas/
|   |-- services/
|   |-- storage/
|   `-- utils/
|-- requirements.txt
`-- README.md
```

## Setup

Create and activate a virtual environment:

```bash
cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If needed, the main packages used in this backend include:

```bash
pip install "fastapi[standard]" pytest httpx
```

## Run the Backend

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

You can also run:

```bash
python -m uvicorn app.main:app --reload
```

The backend should be available at:

```text
http://localhost:8000
```

## API Development Notes

This backend currently uses:

- REST APIs
- in-memory session storage
- role-based payload separation
- session progression with current question index

Because the storage is in memory, all session data is lost when the backend server restarts.

## Current Backend Features

- create session
- join session by PIN
- start session
- get session status
- fetch tutor question payload
- fetch student question payload
- submit student answers
- move to next question
- fetch joined students
- fetch session results
