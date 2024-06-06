
import express, { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { Question } from "../models/Question";
import openai from '../utils/openai';
import generateId from "../utils/helpers/generateId";
//import generateQuestionFunction from "../utils/helpers/generateQuestion";

const router: Router = express.Router();
const filePath: string = path.join(__dirname, "..", "..", "src", "config", "questions.json");

router.post('/generate-question', async (req: Request, res: Response) => {
  const { category, difficulty } = req.body

  // Validate input
  if (!category || !difficulty) {
    return res.status(400).json({ success: false, error: 'Category and difficulty are required.' });
  }

  const prompt = `
Generate a question with the following parameters:
Category: ${category}
Difficulty: ${difficulty}
Output the result in the following JSON format:
{
  "questions": [
    {
      "category": "${category}",
      "difficulty": "${difficulty}",
      "question": "[Your generated question here]",
      "options": ["Option1", "Option2", "Option3", "Option4"],
      "answer": "[Correct answer]",
      "favourited": false,
    }
  ]
}
`;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: "You are a helpful assistant designed to output JSON." },
        { role: 'user', content: prompt },
      ],
    });

     // Log the entire response for debugging
    //console.log('OpenAI API response:', response);
    //console.log(response.choices[0].message.content)
    // Parse the response string into a JSON object
    // const contentObject = JSON.parse(response.choices[0].message.content as string);
    // console.log(contentObject)
    // Extract the generated question details
    const { question, options, answer } = JSON.parse(response.choices[0].message.content as string).questions[0];

    // Read existing questions data
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Failed to read questions data' });
      }
      try {
        // Parse existing questions data
        const questionsData = JSON.parse(data);
        const questions: Question[] = questionsData.questions;

        // Add new question to existing questions array
        const newQuestion: Question = {
          id: generateId(questions),
          category: category,
          difficulty: difficulty,
          question: question,
          options: options,
          answer: answer,
          favourited: false,
          timestamp: new Date().toISOString(),
        };
        questions.push(newQuestion);

        // Serialize updated data and write it to file
        const updateData = JSON.stringify({ questions }, null, 2);
        fs.writeFile(filePath, updateData, 'utf8', (err) => {
          if (err) {
            return res.status(500).json({ success: false, error: 'Failed to update question data' });
          }
          res.status(200).json({ success: true, message: 'Question added successfully', question: newQuestion });
        });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to parse question data' });
      }
    });
  } catch (error) {
    console.error('Error connecting to OpenAI', error);
    res.status(500).json({ success: false, error: 'An error occurred while connecting to OpenAI' });
  }

});

export default router;
