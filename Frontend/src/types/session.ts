export type Student ={
    id: string
    name: string
}

export type Role = "tutor" | "student"

export type session = {
    pin: string
    title: string
    status: "waitng" | "started"
    students: Student[]
}

export type CreateSessionResponse = {
    pin: string
    message: string
}

export type StudentSummary = {
    student_name: string
    submitted_count: number
    correct_count: number
    score: number
}

export type SessionStudentsResponse = {
    pin: string
    students: StudentSummary[]
}