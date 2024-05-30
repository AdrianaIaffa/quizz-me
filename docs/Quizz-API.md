# Quiz App API

## Overview
This project is a Quiz App API designed to manage quiz questions and categories. It provides endpoints to create, read, update, and delete quiz questions, as well as filter questions by category and difficulty level.

## Schema
The data schema for quiz questions is defined as follows:

```json
{
  "id": number,
  "category": string,
  "difficulty": string,
  "question": string,
  "options": string[],
  "answer": string,
  "favourited": boolean,
  "timestamp": string
}
```

## Endpoints

### Get all questions

- **URL:** `/data/all`
- **Method:** GET
- **Description:** Retrieves all quiz questions.
- **Response:** JSON array of question objects.

### Get question by ID

- **URL:** `/data/:id`
- **Method:** GET
- **Description:** Retrieves a specific quiz question by its ID.
- **Response:** JSON object representing the question.

### Add new question

- **URL:** `/data/new`
- **Method:** POST
- **Description:** Adds a new quiz question.
- **Request Body:** JSON object representing the new question.
- **Response:** JSON object of the added question.

### Edit question

- **URL:** `/data/:id`
- **Method:** PUT
- **Description:** Edits an existing quiz question.
- **Request Body:** JSON object with updated question fields.
- **Response:** JSON object of the updated question.

### Delete question

- **URL:** `/data/:id`
- **Method:** DELETE
- **Description:** Deletes a quiz question by its ID.
- **Response:** Success message.

### Get questions by category

- **URL:** `/data/questions/:category`
- **Method:** GET
- **Description:** Retrieves quiz questions filtered by category.
- **Response:** JSON array of question objects.

### Get questions by category and difficulty

- **URL:** `/data/questions/:category/:difficulty`
- **Method:** GET
- **Description:** Retrieves quiz questions filtered by category and difficulty level.
- **Response:** JSON array of question objects.
