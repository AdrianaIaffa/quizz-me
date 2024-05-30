import express, { Router, Request, Response } from "express"
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';
// import * as questionsData from '../config/questions.json';

const router: Router = express.Router()
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');
//console.log(filePath)



router.get('/:id', (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            //indicates reading failure
            res.status(500).json({message: 'Failed to read questions data'})
            return
        } try {
            const questionData = JSON.parse(data);
            //console.log('questionData:', questionData); // Log the parsed JSON data
            const questions = questionData.questions;
            //console.log('questions:', questions); // Log the questions array
            //!question|undefined is saying if you find a questions matching the params then use question interface
            //!otherwise it will be undefined, so the type is either one or the other depending on the result
            const question: Question | undefined = questions.find((q: Question) => q.id === questionId);
            //console.log('question:', question); // Log the found question
            if (!question) {
                res.status(404).json({message: 'Question not found' })
            } else {
                res.json(question)
            }
        } catch (error) {
            //indicates json parsing failure
            res.status(500).json({message: 'Failed to parse question data'})
        }
    })
})

export default router;