import express, { Router, Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../models/Question';

const router: Router = express.Router();
const filePath: string = path.join(__dirname, '..', '..', 'src', 'config', 'questions.json');

// Edit single question
router.put('/:id', (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read questions data' });
        }
        try {
            const questionsData = JSON.parse(data);
            const questions: Question[] = questionsData.questions;
            const question = questions.find((q: Question) => q.id === questionId);

            if (question) {
                const updatedQuestionData = req.body;
                question.category = updatedQuestionData.category;
                question.difficulty = updatedQuestionData.difficulty;
                question.question = updatedQuestionData.question;
                question.options = updatedQuestionData.options;
                question.answer = updatedQuestionData.answer;
                question.favourited = updatedQuestionData.favourited;
                question.timestamp = new Date().toISOString();

                const updateData = JSON.stringify({ questions });
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
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse question data' });
        }
    });
});

export default router;
