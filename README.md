# AI-Based Employee Performance Analytics & Recommendation System

## Project Overview
This project is a full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using the OpenRouter API (`deepseek-v4-flash:free`). It is built to fulfill the requirements of the B.Tech 4th Semester ESE Examination (AI Driven Full Stack Development - AI308B).

## Features
- **Authentication**: Secure JWT-based registration and login system.
- **Employee Management**: HR/Admin users can add and view employee details.
- **Performance Tracking**: Track employee skills, performance scores, and completed projects.
- **Search & Filter**: Find employees by name, role, or department.
- **AI Recommendation Engine**: Generates automated insights, promotion recommendations, and training suggestions for employees using advanced AI.
- **Responsive UI**: Built with React and TailwindCSS for a premium, responsive experience.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **AI Integration**: OpenRouter API (`deepseek/deepseek-v4-flash:free`)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)
- OpenRouter API Key

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/employee-performance
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_key
   ```
4. Start the server: `node index.js`

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

## Deployment
This project is prepared for deployment on platforms like Render or Vercel. 
- For Render backend deployment, ensure you configure the environment variables correctly and set the start command to `node index.js`.
- For Vercel frontend deployment, build the project with `npm run build` and ensure the output directory is set to `dist`.

## License
MIT License
