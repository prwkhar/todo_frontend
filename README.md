# Todo App Frontend

This is the frontend for the Todo App, which interacts with the backend API to manage tasks efficiently.

## Features
- Display a list of tasks with their completion status
- Add a new task
- Update an existing task
- Delete a task
- Update the completion status of a task

## Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- A running instance of the backend API

## Backend API Setup
Before running the frontend, you need to set up the backend API. Follow the instructions in the backend repository:
[Todo API Backend](https://github.com/prwkhar/todo_backend)

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone <your-frontend-repo-link>
   cd <your-frontend-repo-name>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     VITE_SERVER=http://localhost:5000
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend will now be running on `http://localhost:3000`.

## Running the App
1. Ensure the backend API is running.
2. Start the frontend using `npm run dev`.
3. Open `http://localhost:3000` in your browser.

## License
This project is licensed under the MIT License.

