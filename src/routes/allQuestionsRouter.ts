import express, { Router, Request, Response } from "express"
import * as fs from 'fs';
import * as path from 'path';
// import { Question } from '../models/Question';
// import * as questionsData from '../config/questions.json';

const router: Router = express.Router()
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');


router.get('/all', (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            //indicates reading failure
            res.status(500).json({message: 'Failed to read questions data'})
            return
        } try {
            const questionData = JSON.parse(data)
            res.json(questionData)
        } catch (error) {
            //indicates json parsing failure
            res.status(500).json({message: 'Failed to parse question data'})
        }
    })
})

export default router;