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
import randomDifficultyRouter from './routes/randomDifficultyRouter'

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
app.use('/data/level', randomDifficultyRouter)
app.use('/data', addQuestionsRouter);
app.use('/data', editQuestionRouter);
app.use('/data', deleteQuestionRouter)
