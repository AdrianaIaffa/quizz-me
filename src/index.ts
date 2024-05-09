// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import router from './routes/routes'

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

/* Define a route for the root path ("/")
 using the HTTP GET method */

 //!javascript
// app.get('/', (req, res) => {
//     res.send('Express + TypeScript Server');
//   });

//?typescript
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

  /* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});



// //!javascript
// app.get('/api', (req, res) => {
//   fs.readFile( filePath, 'utf8', function (err, data) {
//     res.end( data );
//  });
// })


// //!javascript
// app.get('/api/:id', (req, res) => {
//   fs.readFile( filePath, 'utf8', function (err, data) {
//     const questions = JSON.parse(data)
//     // const questionId = req.params.id
//     // const question = questions.find(q => q.id === parseInt(questionId));

//     // console.log(data)
//     // const itemData = req.body
//     // console.log(itemData)
//     // const questionsObject = JSON.parse(data);
//     //  console.log(questions.params)
//     // const questions = questionsObject['questions']
//     // const question = questions[0]
//     // const questionId = question["id"]
//     // console.log(questions[0]['id'])
//     // const question = data.questions[{id: req.params.id}]
//     // console.log(question)
//     res.send(JSON.stringify(questions))
//  });
// })