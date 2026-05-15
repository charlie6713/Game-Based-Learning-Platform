# Frontend

This folder contains the React frontend for the Game-Based Learning Platform MVP.

## Purpose

The frontend is responsible for:

- tutor question selection
- session creation flow
- student join flow
- lobby waiting state
- question page rendering for tutor and student
- answer submission from the student side
- polling-based synchronization with the backend

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router

## Main Structure

```text
Frontend/
|-- src/
|   |-- data/
|   |-- pages/
|   `-- types/
|-- package.json
`-- README.md
```

## Setup

Install dependencies:

```bash
cd Frontend
npm install
```

## Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

## Frontend Development Notes

This frontend is a small workflow-focused MVP, not the full original school project.

It currently includes these main pages:

- `TutorHomePage`
- `TutorSessionPage`
- `StudentJoinPage`
- `LobbyPage`
- `QuestionPage`

The frontend talks to the backend with `fetch` and uses simple polling to keep tutor and student views synchronized.

## Initial Project Setup Notes

This frontend was originally scaffolded with Vite React TypeScript:

```bash
npm create vite@latest game-based-learning-platform -- --template react-ts
```

Router dependency:

```bash
npm install react-router-dom
```

Tailwind-related setup used in this project:

```bash
npm install tailwindcss @tailwindcss/vite
```

## Current Frontend Features

- tutor creates a session
- student joins with PIN and name
- student waits in the lobby
- tutor starts the game
- tutor and student share one question page
- tutor sees private payload with answer
- student sees public payload without answer
- student submits answers
- tutor moves to the next question
- student syncs question changes by polling
