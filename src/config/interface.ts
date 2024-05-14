interface Question {
    id: number;
    category: string;
    difficulty: string;
    question: string;
    options: string[];
    answer: string;
    favourited: boolean;
    timestamp: string;
}

interface QuizData {
    questions: Question[]
}

export { Question, QuizData };
