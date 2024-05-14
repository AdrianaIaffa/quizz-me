// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
// import router from './routes/routes'
import * as fs from 'fs'
import * as path from 'path'

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

const filePath: string = path.join(__dirname, './config/questions.json')

console.log("filepath:", filePath)
app.get('/api', (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
})

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


app.get('/api/:id', (req:Request, res: Response) => {
    const questionId = parseInt(req.params.id);
        fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        //this line parses the JSON data from the data variable into a Javascript Object.
        //The JSON.parse function converts a JSON formatted string into a Javascrupt object. 
        //after parsing, the resulting object is assign to the variable jsonDataObject
        const jsonDataObject = JSON.parse(data)
       // console.log(jsonDataObject)
        //This line accesses th 'questions property of the jsonDataObject. 
        //it assumes that the prsed JSON object has a property named 'questions',
        //which contains an array of objects 
        const questions: Question[] = jsonDataObject.questions
        console.log(questions)
        const question = questions.find((q: any) => q.id === questionId)
        return res.json(question)
    });
})

