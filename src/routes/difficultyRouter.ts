import express, { Router, Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';

const router: Router = express.Router();
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');

router.get('/:category/:difficulty', (req: Request, res: Response) => {
    const category = req.params.category;
    const difficulty = req.params.difficulty;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read questions data' });
        }
        try {
            const questionData = JSON.parse(data);
            const questions: Question[] = questionData.questions;
            const difficultyFilter = questions.filter((question: Question) =>
                question.category.toLowerCase() === category.toLowerCase() &&
                question.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
            res.json(difficultyFilter);
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse question data' });
        }
    });
});

export default router;
