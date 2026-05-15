# Game-Based Learning Platform MVP

This repository is a **minimal MVP rebuild** of the core workflow from a previous university group project.

The original project was developed by a **7-person team**, and it had a much more polished UI, more complete features, and a larger technical scope. This version is different on purpose:

- it focuses on the **basic end-to-end workflow**
- it keeps the architecture simple
- it is designed as a **small reproducible engineering version** of the original idea

The goal of this repository is to capture the main product flow in a clean and understandable way:

- tutor creates a session
- student joins with a PIN
- tutor starts the game
- tutor and student enter the same question flow
- tutor sees the private payload with the answer
- student sees the public payload without the answer
- student submits an answer
- tutor controls the next question

This is not the full school project. It is a **workflow-first prototype** that recreates the main learning platform logic in a smaller and easier-to-explain form.

## Project Goals

This MVP is mainly built to demonstrate:

- tutor/student role separation
- session-based game flow
- public vs private question payloads
- synchronized question progression
- basic full-stack integration between frontend and backend

## Tech Stack

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Pydantic
- In-memory session storage
- REST API

## Current Architecture

The project is split into two parts:

- `Frontend/`
  - React + TypeScript application
  - handles tutor and student pages
  - calls backend APIs with `fetch`

- `Backend/`
  - FastAPI application
  - manages sessions, questions, answers, and game progression
  - stores active session state in memory

## Current MVP Flow

The current implementation supports this basic flow:

1. Tutor selects questions and creates a session.
2. Backend creates a session PIN.
3. Student joins with a name and PIN.
4. Student waits in the lobby.
5. Tutor starts the game.
6. Tutor and student both move to the question page.
7. Tutor fetches the tutor question payload.
8. Student fetches the student question payload.
9. Student submits an answer to the backend.
10. Tutor moves the game to the next question.
11. Student syncs to the next question by polling the backend.

## Repository Structure

```text
Game-Based-Learning-Platform/
|-- Backend/
|   |-- app/
|   |   |-- routers/
|   |   |-- schemas/
|   |   |-- services/
|   |   |-- storage/
|   |   `-- utils/
|   `-- ...
|-- Frontend/
|   |-- src/
|   |   |-- data/
|   |   |-- pages/
|   |   `-- types/
|   `-- ...
`-- README.md
```

## Important Frontend Pages

- `StudentJoinPage`
  - join a session with student name and PIN

- `LobbyPage`
  - wait for tutor to start the game
  - poll session status

- `TutorHomePage`
  - select questions
  - create a new session

- `TutorSessionPage`
  - view joined students
  - start the game

- `QuestionPage`
  - shared page for tutor and student
  - different API payload based on role
  - student submits answers
  - tutor moves to the next question

## Important Backend Responsibilities

- session creation
- PIN-based joining
- session status management
- public vs private question payload separation
- answer submission
- next-question progression
- in-memory session tracking

## API Overview

Examples of the current backend routes:

- `POST /sessions`
- `POST /sessions/join`
- `POST /sessions/{pin}/start`
- `GET /sessions/{pin}/status`
- `GET /sessions/{pin}/student/question`
- `GET /sessions/{pin}/tutor/question`
- `POST /sessions/{pin}/submit`
- `POST /sessions/{pin}/next`
- `GET /sessions/{pin}/students`
- `GET /sessions/{pin}/results`

## How to Run

### Backend

Go to the backend folder and start the FastAPI server.

Example:

```bash
cd Backend
uvicorn app.main:app --reload
```

The backend should run on:

```text
http://localhost:8000
```

### Frontend

Go to the frontend folder and start the Vite development server.

Example:

```bash
cd Frontend
npm install
npm run dev
```

The frontend should run on:

```text
http://localhost:5173
```

## Notes

- This project currently uses **in-memory storage**, so session data resets when the backend restarts.
- The UI is intentionally simple.
- The main focus is the **workflow and architecture**, not visual polish.
- This repository is a **minimal engineering rebuild**, not the full original team project.

## Future Improvements

Possible next steps for this MVP:

- persistent database storage
- better session completion states
- clearer results page
- unified countdown control from the backend
- stronger error handling
- better UI and UX polish
- automated tests and CI setup

## Summary

This repository is a small full-stack MVP that recreates the core workflow of a larger game-based learning platform project.

It is mainly useful as:

- a learning project
- a workflow prototype
- a portfolio-friendly engineering rebuild
- a simplified version of a larger multi-person university system
