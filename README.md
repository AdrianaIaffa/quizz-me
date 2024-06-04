<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">

# Quizz Me!
[Project 1](https://deploy-preview-952--fac-coursebook.netlify.app/course/syllabus/developer/project-1-server/schedule/)

- [Project Specifications](docs/Project-Overview.md)
- [Schema](docs/Quizz-API.md)

## Helpful Resources
- [Node.js TypeScript Express Tutorial](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
- [Introduction To Typescript](https://www.youtube.com/watch?v=v4FLgfOSOaw)
- [Typescript Docs Codeacademy](https://www.codecademy.com/resources/docs/typescript)
- [Randomise an Array](https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/)
## Prerequisites
Ensure you have Node.js installed, along with a package manager like npm.

## Creating a package.json file
Initialize a new Node.js project using `npm init -y` and update the `main` field in `package.json` to point to `src/index.js`.

## Creating a minimal server with Express
Install Express and DotEnv, create a basic Express server in `src/index.js`, and utilize environment variables with DotEnv.

## Installing TypeScript
Install TypeScript and the type definitions for Express and Node.js as development dependencies using `npm i -D typescript @types/express @types/node`.

## Generating tsconfig.json
Use `npx tsc --init` to generate a `tsconfig.json` file with default compiler options. Update the `outDir` option to `"./dist"`.

## Create an Express server with a .ts extension
Rename `index.js` to `index.ts` and update the code to use TypeScript syntax, including type annotations.

## Running TypeScript in Node with ts-node
Use `npx ts-node src/index.ts` to execute TypeScript files directly in Node.js during development.

## Watching file changes
Install nodemon and ts-node as development dependencies and configure the `dev` script in `package.json` to use `nodemon` to watch for changes and automatically restart the server.

## Building or transpiling TypeScript files
Use `npm run build` to compile TypeScript files into JavaScript, generating output in the `dist` directory.
