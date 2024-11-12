# API Documentation

Welcome to the API documentation. This API allows users to:

- **User Management**: Register, login, and update user accounts.
- **ChatGPT Interaction**: Engage in conversations with a GPT-based chatbot.

**Base URL**: `https://iitc-b-backend-server-akinator-project-w.onrender.com`

---

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
   - [User Endpoints](#user-endpoints)
     - [Create New User](#create-new-user)
     - [Login User](#login-user)
     - [Update User Data](#update-user-data)
   - [ChatGPT Endpoints](#chatgpt-endpoints)
     - [Talk with GPT](#talk-with-gpt)
     - [Reset Conversation](#reset-conversation)
4. [Error Handling](#error-handling)
5. [FAQs](#faqs)
6. [Examples](#examples)

---

## Introduction

This API provides endpoints for user management and interaction with a GPT-based chatbot. It enables developers to integrate user registration, authentication, and conversational AI features into their applications seamlessly.

---

## Authentication

- **Token-Based Authentication**: Uses JSON Web Tokens (JWT).
- **Token Retrieval**: Upon successful login, a token is provided.
- **Token Usage**: Include the token in the **request body** with the key `"token"` for protected routes.

---

## Endpoints

### User Endpoints

#### Create New User

**Endpoint**

```http
POST /api/users/users
```

**Description**

Creates a new user account.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "fName": "Jane",
  "user": "jane_doe",
  "password": "securePassword123",
  "email": "example@gmail.com"
}
```

**Response**

- **Status Code**: `201 Created`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "User has been created.",
    "newUser": {
      "_id": "60c72b2f9e7f8e3a2c4d4567",
      "fName": "Jane",
      "user": "jane_doe",
      "email": "example@gmail.com",
      "__v": 0
    }
  }
  ```

---

#### Login User

**Endpoint**

```http
POST /api/users/users/login
```

**Description**

Authenticates a user and returns a JWT token.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "email": "example@gmail.com",
  "password": "securePassword123"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "User has logged in successfully",
    "token": "<jwt_token>"
  }
  ```

---

#### Update User Data

**Endpoint**

```http
PUT /api/users/users/:id
```

**Description**

Updates an existing user's data completely.

**Headers**

- `Content-Type: application/json`

**URL Parameters**

- `:id` — The unique identifier of the user.

**Request Body**

```json
{
  "token": "<your_jwt_token>",
  "fName": "Jane",
  "user": "jane_doe_updated",
  "password": "newSecurePassword456",
  "email": "new_example@gmail.com"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "User ID: 60c72b2f9e7f8e3a2c4d4567 has been updated."
  }
  ```

---

### ChatGPT Endpoints

#### Talk with GPT

**Endpoint**

```http
POST /api/chatgpt/prompt
```

**Description**

Sends a prompt to ChatGPT and receives a response.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "token": "<your_jwt_token>",
  "text": "Let's play akinator!"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "Is it a character from a movie?"
  }
  ```

---

#### Reset Conversation

**Endpoint**

```http
POST /api/chatgpt/prompt
```

**Description**

Resets the conversation flow for the current user.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "token": "<your_jwt_token>",
  "text": "clear"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "Conversation has been reset."
  }
  ```

---

## Error Handling

All error responses follow this structure:

```json
{
  "message": "Error description."
}
```

Common error codes:

- **400 Bad Request**: Missing or invalid request parameters.
- **401 Unauthorized**: Authentication failed or token expired.
- **403 Forbidden**: The authenticated user does not have permission to perform the operation.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## FAQs

**Q1: How do I include the JWT token in my requests?**

Include the token in the **request body** with the key `"token"` for all protected routes. Example:

```json
{
  "token": "<your_jwt_token>",
  "other_field": "value"
}
```

---

**Q2: What should I do if my token expires?**

Tokens are valid for 1 hour. If your token expires, you need to log in again to receive a new token.

---

**Q3: How do I handle CORS issues when making requests from the frontend?**

If you encounter CORS (Cross-Origin Resource Sharing) issues when making API requests from your frontend application, make sure your frontend is configured to send requests with the appropriate headers. Also, ensure that the server has CORS enabled for your domain or uses a wildcard `*` to accept requests from any domain.

---

## Examples

### Register a New User

**Request**

```http
POST /api/users/users HTTP/1.1
Host: iitc-b-backend-server-akinator-project-w.onrender.com
Content-Type: application/json

{
  "fName": "Jane",
  "user": "jane_doe",
  "password": "securePassword123",
  "email": "example@gmail.com"
}
```

**Response**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Success",
  "response": "User has been created.",
  "newUser": {
    "_id": "60c72b2f9e7f8e3a2c4d4567",
    "fName": "Jane",
    "user": "jane_doe",
    "email": "example@gmail.com",
    "__v": 0
  }
}
```

---

### Login a User

**Request**

```http
POST /api/users/users/login HTTP/1.1
Host: iitc-b-backend-server-akinator-project-w.onrender.com
Content-Type: application/json

{
  "email": "example@gmail.com",
  "password": "securePassword123"
}
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Success",
  "response": "User has logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Update User Data

**Request**

```http
PUT /api/users/users/60c72b2f9e7f8e3a2c4d4567 HTTP/1.1
Host: iitc-b-backend-server-akinator-project-w.onrender.com
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "fName": "Jane",
  "user": "jane_doe_updated",
  "password": "newSecurePassword456",
  "email": "new_example@gmail.com"
}
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Success",
  "response": "User ID: 60c72b2f9e7f8e3a2c4d4567 has been updated."
}
```

---

### Talk with ChatGPT

**Request**

```http
POST /api/chatgpt/prompt HTTP/1.1
Host: iitc-b-backend-server-akinator-project-w.onrender.com
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "text": "I am thinking of a fictional creature..."
}
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Success",
  "response": "Is it a creature from mythology or folklore?"
}
```

---

### Reset ChatGPT Conversation

**Request**

```http
POST /api/chatgpt/prompt HTTP/1.1
Host: iitc-b-backend-server-akinator-project-w.onrender.com
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "text": "clear"
}
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Success",
  "response": "Conversation has been reset."
}
```
