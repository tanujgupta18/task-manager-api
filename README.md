# Task Manager API

## Overview

A RESTful API for managing tasks with authentication.

* Users can register and login
* JWT-based authentication
* CRUD operations for tasks
* Each user can manage only their own tasks

---

## Setup Instructions

```bash
git clone https://github.com/tanujgupta18/task-manager-api.git
cd task-manager-api
npm install
```

---

## Environment Variables

Create a `.env` file in root:

```
PORT=5000
JWT_SECRET=your_secret_key
PG_URI=your_postgres_connection_string
MONGO_URI=your_mongodb_connection_string
```

---

## Run Server

```bash
npm run dev
```

---

## Authentication APIs

### Register

POST `/api/auth/register`

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

---

### Login

POST `/api/auth/login`

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Get Profile

GET `/api/auth/me`

Header:

```
Authorization: Bearer TOKEN
```

---

## Task APIs (Protected Routes)

### Create Task

POST `/api/tasks`

```json
{
  "title": "Learn Backend",
  "description": "Finish assignment"
}
```

---

### Get All Tasks

GET `/api/tasks`

---

### Get Single Task

GET `/api/tasks/:id`

---

### Update Task

PATCH `/api/tasks/:id`

```json
{
  "status": "completed"
}
```

---

### Delete Task

DELETE `/api/tasks/:id`

---

## Features

* JWT Authentication
* Password hashing using bcrypt
* MongoDB for tasks
* PostgreSQL for users
* Input validation using express-validator
* Global error handling
* Protected routes using middleware

---

## Testing

Use Postman to test all endpoints.

* Add `Authorization: Bearer TOKEN` for protected routes
* Test invalid inputs for validation
* Try accessing another user's task → should return **403 Forbidden**
