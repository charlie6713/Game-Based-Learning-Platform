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