# Task Manager API

## Overview

A RESTful API for managing tasks with authentication.

* Users can register and login
* JWT-based authentication
* CRUD operations for tasks
* Each user can manage only their own tasks
* Real-time task reminders (simulated)
* Task categorization and tagging
* Webhook integration for completed tasks

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
WEBHOOK_URL=your_webhook_url
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
  "description": "Finish assignment",
  "category": "Work",
  "tags": ["Bug", "High Priority"],
  "dueDate": "2026-04-16T18:00:00Z"
}
```

---

### Get All Tasks (with filters)

GET `/api/tasks?category=Work&tag=Bug`

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

## Advanced Features (Level 3)

### Task Reminders (Event-Driven)

* When a task is created or updated with a `dueDate`, a reminder is scheduled.
* Reminder triggers **1 hour before due time** using `setTimeout`.
* If a task is updated or deleted, previous reminders are cancelled.
* Completed tasks do not trigger reminders.

---

### Categories & Tags

* Tasks support predefined categories:

  * `Work`, `Personal`, `Urgent`
* Tags are flexible and stored as an array of strings.
* Tasks can be filtered using query parameters:

  * `?category=Work`
  * `?tag=Bug`

---

### Webhook Integration

* When a task is marked as `completed`, a webhook is triggered.
* Sends POST request to external service (`WEBHOOK_URL`)
* Payload includes:

  * taskId
  * title
  * userId
  * completedAt

---

## Testing

Use Postman to test all endpoints.

* Add `Authorization: Bearer TOKEN` for protected routes
* Test invalid inputs for validation
* Try accessing another user's task → should return **403 Forbidden**
* Use [https://webhook.site](https://webhook.site) to verify webhook payload
