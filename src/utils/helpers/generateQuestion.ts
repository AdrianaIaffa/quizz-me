// utils/helpers/generateQuestion.js
// function generateQuestion(category: string, difficulty: string) {
//   return {
//     id: 1,
//     category: category,
//     difficulty: difficulty,
//     question: `Mock question for ${category} (${difficulty})`,
//     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
//     answer: "Option 1",
//   };
// }

// export default generateQuestion;

// const generateQuestionTrivia = {
//   name: "generate_question_trivia",
//   description: "Generate a trivia question with options and answer",
//   parameters: {
//     type: "object",
//     properties: {
//       category: {
//         type: "string",
//         description: "The category of the trivia question",
//       },
//       difficulty: {
//         type: "string",
//         description: "The difficulty level of the trivia question",
//       },
//     },
//     required: ["category", "difficulty"],
//   },
//   options: {
//     type: "array",
//     description: "Options for the trivia question",
//     items: {
//       type: "string",
//     },
//     minItems: 4, // Specify that there should be at least 4 options
//     maxItems: 4, // Specify that there should be at most 4 options
//   },
//   answer: {
//     type: "string",
//     description: "The correct answer to the trivia question",
//     enum: {
//       $ref: "#/properties/options/items", // Reference to the options array
//     },
//   },
// };

// export default generateQuestionTrivia