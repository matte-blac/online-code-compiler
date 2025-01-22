# Online Code Compiler

## Description
The **Online Code Compiler** is a web-based application that allows users to write, execute, and view the output of code written in supported programming languages. It provides a simple interface for coding, testing, and viewing the results in real-time.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Libraries/Tools**:
  - axios for HTTP requests
  - bull for job queue processing
  - moment for date formatting
  - child_process for executing commands
  - uuid for generating unique file identifiers
  - mongoose for MongoDB object modeling
  - cors for enabling cross-origin requests

- **Languages Supported**:
  - C++
  - Python

## Design
### User Interface
The project features a simple user interface built with React.js. It includes:
- A dropdown to select the programming language (C++ or Python).
- A text area for writing code.
- Buttons to set the default language and submit code.
- Sections to display job status, output, and execution details.

### Terminal Interaction
For terminal-based execution, the application supports C++ and Python compilation and execution via backend scripts.

## Features
- **Real-time code compilation and execution**.
- **Support for multiple programming languages** (C++ and Python).
- **Job queue management** with parallel processing (up to 5 workers).
- **Error handling** for invalid or unsupported code.
- **Execution time and job status tracking**.
- **Persistent storage** for job details using MongoDB.

## How to Run the Project

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MongoDB](https://www.mongodb.com/try/download/community).
3. Install a C++ compiler (e.g., g++) and Python3.

### Installation
1. Clone the repository:
   
bash
   git clone git@github.com:matte-blac/online-code-compiler.git
   cd online-code-compiler

2. Install dependencies for both backend and frontend:
   
bash
   npm install


### Running the Application
1. Start MongoDB:
   
bash
   mongod

2. Start the backend server:
   
bash
   cd backend
   node index.js

3. Start the frontend:
   
bash
   cd client
   npm start


### Using the Application
- Access the application in your browser at http://localhost:3000.
- Write code in the provided text area, select a language, and click **Submit**.
- View the job status, output, and execution details below the editor.

## Notes
- Ensure g++ and python3 are available in your system's PATH for backend functionality.
- Modify the MongoDB connection URL in the backend (mongoose.connect) if using a remote database.