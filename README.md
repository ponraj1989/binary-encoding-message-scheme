# Developing a a Simple Binary Message Encoding Scheme

## To Setup the project up and running

# Pre-requisites

 - Install [Node.js](https://nodejs.org/en/) Node js 16 +

# Getting started

- clone the repository
- Install dependencies - creates node_modules and package-lock.json
```
npm install
```
- Set the environment variable for APIKEY
- Build and run the project 
- Build creates the folder dist - compiled output of typescipt build

```
npm build && npm start
```
Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Spec Endpoint : http://localhost:3000/apidocs  

# TypeScript + Node 
The main purpose of this project is to Design and Implement a Simple Binary Message Encoding Scheme. The Rest APIs will be using the Swagger (OpenAPI) Specification.

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **coverage**             | Contains the code coverage details from the jest coverage.                                    |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.                            |
| **node_modules**         | Contains all  npm dependencies                                                                |
| **src**                  | Contains  source code that will be compiled to the dist dir                                   |
| **src/middlewares**      | Express middlewares  process the incoming requests before handling them down to the routes    |
| **src**/index.ts         | Entry point to express app                                                                    |  
| **test**                 | contains the test configuration                                                               |
| package.json             | Contains npm dependencies as well as [build scripts]                                          |
| tsconfig.json            | Config settings for compiling source code only written in TypeScript                          |
| tslint.json              | Config settings for TSLint code style checking                                                |


## Testing
The test is written in Jest. test file is available under the folder "test"

```
"jest": "29.7.0" 

```

### Running tests using NPM Scripts
````
npm run test

````

### Running code coverage using NPM Scripts
````
npm run test:coverage

````

- creates a folder coverage with code coverage related information ready to be viewed in browser

- View report in browser : localhost:3000

````
cd coverage/lcov-report
serve

````

# Swagger

Swagger is used to visualize and interact with the API’s resources without having any of the implementation logic in place. The swagger specification file is named as swagger.yaml. The file is located under definition folder.

# TSLint
TSLint is a code linter that helps catch minor code quality and style issues.

## TSLint rules
All rules are configured through `tslint.json`.

## Running TSLint
To run TSLint you can call the main build script or just the TSLint task.
```
npm run lint  // runs only TSLint
```

## Encoding and Decoding logic

 - encode(message: Message): Uint8Array:
This method takes a Message instance as input and returns a binary representation (Uint8Array) of that message.

It uses two Uint8Arrays of two bytes each to store the length of the key and value for each header in the message.

All headers are concatenated together in a single buffer, with a single byte at the beginning representing the total number of headers. This implies a maximum of 256 headers.

The payload is concatenated at the end.

 - decode(data: Uint8Array): Message:
This method takes a binary representation (Uint8Array) of a Message instance and returns the decoded Message.

It starts by reading the total number of headers from the first byte.

Then, for each header, it reads two bytes to get the key length and then reads the key itself. Next, it reads two bytes again to get the value length, and finally the value itself. Each key-value pair is then set on the Message object.

After all headers are read, the rest of the data is considered the payload of the Message.



