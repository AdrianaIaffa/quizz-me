import express, { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { Question } from "../models/Question";
// import * as questionsData from '../config/questions.json';

const router: Router = express.Router();
const filePath: string = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "config",
  "questions.json"
);
//console.log(filePath)

router.get("/:category/random", (req: Request, res: Response) => {
  const category = req.params.category;
  console.log(`Requested category: ${category}`);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      //indicates reading failure
      console.error(`Error reading file: ${err.message}`);
      res.status(500).json({ message: "Failed to read questions data" });
      return;
    }
    try {
      const questionData = JSON.parse(data);
      console.log('questionData:', questionData); // Log the parsed JSON data

      const questions: Question[] = questionData.questions;
      console.log('questions:', questions); // Log the questions array
      //The filter function uses (question: Question) to indicate each element is a Question object,
      //allowing direct access to question.category as a string
      const categoryFilter = questions.filter(
        (question: Question) =>
          question.category.toLowerCase() === category.toLowerCase()
      );
      console.log('Filtered questions:', categoryFilter); // Log the filtered questions
      //res.json(categoryFilter);

      // declare the function
      const shuffle = (array: Question[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      // Usage

      const shuffledArray = shuffle(categoryFilter);
      console.log('Shuffled array:', shuffledArray); // Log the shuffled array
      res.json(shuffledArray);

      console.log(shuffledArray);
    } catch (error) {
      //indicates json parsing failure
      res.status(500).json({ message: "Failed to parse question data" });
    }
  });
});

export default router;
