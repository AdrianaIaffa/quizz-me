import express, { Router, Request, Response } from "express"
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';
// import * as questionsData from '../config/questions.json';

const router: Router = express.Router()
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');
//console.log(filePath)



router.get('/:category', (req: Request, res: Response) => {
    const category = req.params.category

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            //indicates reading failure
            res.status(500).json({message: 'Failed to read questions data'})
            return
        } try {
            const questionData = JSON.parse(data);
            //console.log('questionData:', questionData); // Log the parsed JSON data
            const questions: Question[] = questionData.questions;
            //console.log('questions:', questions); // Log the questions array
            //The filter function uses (question: Question) to indicate each element is a Question object, 
            //allowing direct access to question.category as a string
            const categoryFilter = questions.filter((question: Question) => 
                question.category.toLowerCase() === category.toLowerCase())
            res.json(categoryFilter)
        } catch (error) {
            //indicates json parsing failure
            res.status(500).json({message: 'Failed to parse question data'})
        }
    })
})

export default router;