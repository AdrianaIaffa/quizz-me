import { Question } from "../../models/Question";

//helper function to set new id when adding a new question, this is for app.post('/data/new')
function generateId(questions: Question[]) {
    let counter = 0
    questions.forEach(question => {
        counter +=1
    });
    return counter +1
}

export default generateId