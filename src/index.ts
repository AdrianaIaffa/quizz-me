// src/index.ts
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
// import router from './routes/routes'
import * as fs from 'fs'
import * as path from 'path'

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

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});

const filePath: string = path.join(__dirname, './config/questions.json')

console.log("filepath:", filePath)
app.get('/api', (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
})

