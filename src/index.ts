// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import * as fs from 'fs'
import * as path from 'path'
import * as questionsData from '../src/config/questions.json';
const filePath: string = path.join(__dirname, '..', 'src', 'config', 'questions.json')

console.log("filepath:", filePath)
console.log(questionsData.questions)

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});

//interface
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

//json end point all questions
app.get('/data.json', (req: Request, res: Response) => {
    //console.log(questionsData.questions) //this is already an object ❤️
    res.json(questionsData)
});

//json single question
app.get('/data/:id', (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);
    // console.log(typeof questionsData) object ❤️
    //question|undefined is saying if you find a questions matching the params then use question interface
    //otherwise it will be undefined, so the type is either one or the other depending on the result
    const question: Question | undefined = questionsData.questions.find((q: Question) => q.id === questionId)
    res.json(question)
})

//json sort by category
app.get('/data/questions/:category', (req: Request, res: Response) => {
    const category = req.params.category
    //console.log("Requested category:", category);
    //this is saying question is an array of question objects
    const questions: Question[] = questionsData.questions
    //console.log("Questions data:", questions);
    //The filter function uses (question: Question) to indicate each element is a Question object, 
    //allowing direct access to question.category as a string
    const categoryFilter = questions.filter((question: Question) => question.category.toLowerCase() === category.toLowerCase())
    //console.log("Filtered questions:", categoryFilter);
    res.json(categoryFilter)
})

//json sort by difficulty
app.get('/data/questions/:category/:difficulty', (req: Request, res: Response) => {
    const category = req.params.category;
    const difficulty = req.params.difficulty;
    // console.log("Requested category:", category);
    // console.log("Requested difficulty:", difficulty);
    const questions: Question[] = questionsData.questions;
    // console.log("Questions data:", questions);
    const difficultyFilter = questions.filter(
        (question: Question) =>
            question.category.toLowerCase() === category.toLowerCase() &&
            question.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
    // console.log("Filtered questions:", difficultyFilter);
    res.json(difficultyFilter);
});

//add new question
app.post('/data/new', (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        //console.log(typeof data)
        //because data in here is actually a string and you have to turn the data into an object
        //we are doing JSON.parse so the data becomes an object
        // Parse existing questions from JSON
        const questions = JSON.parse(data).questions;
        const newQuestion: Question = {
            id: generateId(questions),
            category: req.body.category,
            difficulty: req.body.difficulty,
            question: req.body.question,
            options: req.body.options,
            answer:req.body.answer,
            favourited: req.body.favourited,
            timestamp: new Date().toISOString(),
        }
        questions.push(newQuestion)
        //JSON.stringify creates a new object, so i need to add {}
        const updateData = JSON.stringify({questions})
        fs.writeFile(filePath, updateData, 'utf8', function(err){
            res.status(200).json()
        })

    })

})

//helper function to set new id when adding a new question, this is for app.post('/data/new')
function generateId(questions: Question[]) {
    let counter = 0
    questions.forEach(question => {
        counter +=1
    });
    return counter +1
    
}

//edit single question
app.put('/data/:id', (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);
    // console.log(typeof questionsData) object ❤️
    //question|undefined is saying if you find a questions matching the params then use question interface
    //otherwise it will be undefined, so the type is either one or the other depending on the result
    const questions: Question[] = questionsData.questions
    const question = questions.find((q: Question) => q.id === questionId)
    // res.json(question)
   if(question){
    //if you find a question then retrieve the body so you can edit
    const updatedQuestionData = req.body
      // set the new data 
      question.category = updatedQuestionData.category;
      question.difficulty = updatedQuestionData.difficulty;
      question.question = updatedQuestionData.question;
      question.options = updatedQuestionData.options;
      question.answer = updatedQuestionData.answer;
      question.favourited = updatedQuestionData.favourited;
      question.timestamp = updatedQuestionData.timestamp;
    // once you have updated one question, you need to save the entire questionData again
      const updateData = JSON.stringify({questions})
      fs.writeFile(filePath, updateData, 'utf8', (err) => {
        if (err) {
            res.status(500).json({ message: 'Failed to update question data' });
        } else {
            res.status(200).json({ message: 'Question updated successfully', question });
        }
    });
} else {
    res.status(404).json({ message: 'Question not found' });
}
});