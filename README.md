# Vidly – Backend Movie Rental API

Vidly is a production-ready backend service that simulates a real-world movie rental system.  
It provides secure authentication, authorization, RESTful APIs, input validation, and a complete rental workflow — from user registration to movie return with automatic rental fee calculation.

---

## Features

• User signup and login with JWT authentication  
• Role-based access for protected routes  
• CRUD operations for genres, movies, customers, and rentals  
• Input validation using Joi  
• MongoDB database modeling with Mongoose  
• Automatic rental fee calculation on return  
• Error handling and logging with Winston  
• Jest tests for API reliability

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Language | JavaScript (Node.js) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Validation | Joi |
| Logging | Winston |
| Testing | Jest |

---

## API Base URL
vidly-brtq.onrender.com

Best tested using Postman.  
Note: Render free tier may take 20–30 seconds to spin up if inactive.

---

## Setup Instructions (Local Development)

Follow the steps below to run the project locally.

### 1. Clone the repository
git clone <your-github-repo-link>
cd vidly

### 2. Install depencies
npm install

### 3. Configure environment variables
vidly_jwtPrivateKey = <your-secret-key>
vidly_db = <your-db-connection-string>

### 3. Start the server
npm start

### Optional
Run automated test: npm test





