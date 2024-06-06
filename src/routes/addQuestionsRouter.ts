import express, { Router, Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';
import generateId from '../utils/helpers/generateId'

const router: Router = express.Router();
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');

router.post('/new', (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read questions data' });
        }
        try {
            //because data in here is actually a string and you have to turn the data into an object
            //we are doing JSON.parse so the data becomes an object
            // Parse existing questions from JSON
            const questionsData = JSON.parse(data);
            //console.log(questionsData)
            const questions: Question[] = questionsData.questions;
            const newQuestion: Question = {
                id: generateId(questions),
                category: req.body.category,
                difficulty: req.body.difficulty,
                question: req.body.question,
                options: req.body.options,
                answer: req.body.answer,
                favourited: req.body.favourited,
                timestamp: new Date().toISOString(),
            };
            questions.push(newQuestion);
            //JSON.stringify creates a new object, so i need to add {}
            const updateData = JSON.stringify({ questions }, null, 2);
            fs.writeFile(filePath, updateData, 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to update question data' });
                }
                res.status(200).json({ message: 'Question added successfully', question: newQuestion });
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse question data' });
        }
    });
});


// //helper function to set new id when adding a new question, this is for app.post('/data/new')
// function generateId(questions: Question[]) {
//     let counter = 0
//     questions.forEach(question => {
//         counter +=1
//     });
//     return counter +1
// }

export default router;