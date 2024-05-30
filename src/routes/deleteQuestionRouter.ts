import express, { Router, Request, Response } from "express"
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';


const router: Router = express.Router()
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');
//console.log(filePath)

// Delete a single question by ID
router.delete('/:id', (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read questions data' });
        }
        try {
            const questionsData = JSON.parse(data);
            const questions: Question[] = questionsData.questions;

            // Find the index of the question
            const questionIndex = questions.findIndex((q: Question) => q.id === questionId);
            // If questionIndex is -1, it means the question id number minus 1 is the index and if 
            //you cant find that index then the question doesnt exist
            if (questionIndex === -1) {
                return res.status(404).json({ message: 'Question not found' });
            }
            // Remove the question from the array
            questions.splice(questionIndex, 1);

            //update data back to the file
            fs.writeFile(filePath, JSON.stringify({ questions }), 'utf-8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to update questions data' });
                }
                res.status(200).json({ message: 'Question deleted successfully' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse questions data' });
        }
    });
});

export default router;
