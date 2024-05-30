// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import allQuestionsData from './routes/allQuestionsRouter';
import singleQuestionData from './routes/singleQuestionRouter'
import categoryRouter from './routes/categoriesRouter'
import difficultyRouter from './routes/difficultyRouter';
import addQuestionsRouter from './routes/addQuestionsRouter'
import editQuestionRouter from  './routes/editQuestionRouter'
import deleteQuestionRouter from './routes/deleteQuestionRouter'

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

app.use('/data', allQuestionsData)
app.use('/data', singleQuestionData)
app.use('/data/questions', categoryRouter)
app.use('/data/questions', difficultyRouter);
app.use('/data', addQuestionsRouter);
app.use('/data', editQuestionRouter);
app.use('/data', deleteQuestionRouter)



// //edit single question
// app.put('/data/:id', (req: Request, res: Response) => {
//     const questionId = parseInt(req.params.id);
//     // console.log(typeof questionsData) object ❤️
//     //question|undefined is saying if you find a questions matching the params then use question interface
//     //otherwise it will be undefined, so the type is either one or the other depending on the result
//     const questions: Question[] = questionsData.questions
//     const question = questions.find((q: Question) => q.id === questionId)
//     // res.json(question)
//    if(question){
//     //if you find a question then retrieve the body so you can edit
//     const updatedQuestionData = req.body
//       // set the new data 
//       question.category = updatedQuestionData.category;
//       question.difficulty = updatedQuestionData.difficulty;
//       question.question = updatedQuestionData.question;
//       question.options = updatedQuestionData.options;
//       question.answer = updatedQuestionData.answer;
//       question.favourited = updatedQuestionData.favourited;
//       question.timestamp = updatedQuestionData.timestamp;
//     // once you have updated one question, you need to save the entire questionData again
//       const updateData = JSON.stringify({questions})
//       fs.writeFile(filePath, updateData, 'utf8', (err) => {
//         if (err) {
//             res.status(500).json({ message: 'Failed to update question data' });
//         } else {
//             res.status(200).json({ message: 'Question updated successfully', question });
//         }
//     });
// } else {
//     res.status(404).json({ message: 'Question not found' });
// }
// });