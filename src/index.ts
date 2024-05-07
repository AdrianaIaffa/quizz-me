// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import '../config/questions.json'
import * as fs from 'fs'
// const filePath = path.join(__dirname, '../config/questions.json')

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

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
  });

  /* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});

app.get('/api', (req, res) => {
 
  fs.readFile( __dirname + '/../config/questions.json', 'utf8', function (err, data) {
    res.end( data );
 });
})