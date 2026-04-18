export type Question={
    id:number
    text: string
    options: string[]
    answer: string
}

export type QuestionBank={
    title: string
    questions: Question[]
}