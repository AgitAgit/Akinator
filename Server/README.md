# API Documentation

Welcome to the API documentation. This API allows users to:

- **User Management**: Register, login, update, and delete user accounts.
- **ChatGPT Interaction**: Engage in conversations with a GPT-based chatbot.

**Base URL**: `http://localhost:3000`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Endpoints](#endpoints)
   - [User Endpoints](#user-endpoints)
     - [Create New User](#create-new-user)
     - [Login User](#login-user)
     - [Update User Data](#update-user-data)
     - [Delete User](#delete-user)
   - [ChatGPT Endpoints](#chatgpt-endpoints)
     - [Talk with GPT](#talk-with-gpt)
     - [Reset Conversation](#reset-conversation)
3. [Error Handling](#error-handling)
4. [FAQs](#faqs)
5. [Examples](#examples)
6. [Final Notes](#final-notes)

---

## Authentication

- **Token-Based Authentication**: Uses JSON Web Tokens (JWT).
- **Token Retrieval**: Upon successful login, a token is provided.
- **Token Usage**: Include the token in the **request body** with the key `"token"` for protected routes.

---

## Endpoints

### User Endpoints

---

#### Create New User

**Endpoint**

```http
POST http://localhost:3000/api/users/users
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

**Notes**

- Passwords are securely hashed before storage.
- All fields are required.
- The `password` field is not returned in the response for security reasons.

---

#### Login User

**Endpoint**

```http
POST http://localhost:3000/api/users/users/login
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

**Notes**

- The token expires after 1 hour.
- Amit, your part is to store it in the cookie object in the browser.

---

#### Update User Data

**Endpoint**

```http
PUT http://localhost:3000/api/users/users/:id
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

**Notes**

- Include the JWT token in the request body with the key `"token"`.
- This operation replaces the entire user object.
- All fields are required for a full update.
- The user must be authenticated.
- Only the authenticated user can update their own data.

---

#### Delete User

**Endpoint**

```http
DELETE http://localhost:3000/api/users/users/:id
```

**Description**

Deletes a user account.

**Headers**

- `Content-Type: application/json`

**URL Parameters**

- `:id` — The unique identifier of the user.

**Request Body**

```json
{
  "token": "<your_jwt_token>"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "User ID: 60c72b2f9e7f8e3a2c4d4567 has been successfully deleted."
  }
  ```

**Notes**

- Include the JWT token in the request body with the key `"token"`.
- The user must be authenticated.
- Only the authenticated user can delete their own account.
- Use caution as this action is irreversible.

---

### ChatGPT Endpoints

---

#### Talk with GPT

**Endpoint**

```http
POST http://localhost:3000/api/chatgpt/prompt
```

**Description**

Sends a prompt to ChatGPT and receives a response.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "text": "Let's play akinator!",
  "token": "<your_jwt_token>"
}
```

**Response**

- **Status Code**: `200 OK`
- **Body**

  ```json
  {
    "message": "Success",
    "response": "Is it a football player?..."
  }
  ```

**Notes**

- Include the JWT token in the request body with the key `"token"`.
- The conversation context is maintained per user session.
- The user must be authenticated.

---

#### Reset Conversation

**Endpoint**

```http
POST http://localhost:3000/api/chatgpt/prompt
```

**Description**

Resets the conversation flow for the current user.

**Headers**

- `Content-Type: application/json`

**Request Body**

```json
{
  "text": "clear",
  "token": "<your_jwt_token>"
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

**Notes**

- Include the JWT token in the request body with the key `"token"`.
- Sending "clear" as the text resets the conversation history.
- The user must be authenticated.

---

## Error Handling

All error responses follow this structure:

```json
{
  "message": "Error description."
}
```

- **400 Bad Request**: Missing or invalid request parameters.
- **401 Unauthorized**: Authentication failed or token expired.
- **403 Forbidden**: The authenticated user does not have permission to perform the operation.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## FAQs

---

**Q1: How do I include the JWT token in my requests?**

Include the token in the **request body** with the key `"token"` for all protected routes. Example:

```json
{
  "token": "<your_jwt_token>",
  "other_field": "value"
}
```

**Q2: What should I do if my token expires?**

Tokens are valid for 1 hour. If your token expires, you need to log in again to receive a new token.

**Q3: Can I update only certain fields of my user data?**

Yes, use the `PATCH` method on the update endpoint to modify specific fields:

```http
PATCH http://localhost:3000/api/users/users/:id
```

Include the JWT token and only the fields you wish to update in the request body.

---

## Examples

---

### Register a New User

**Request**

```http
POST http://localhost:3000/api/users/users HTTP/1.1
Host: localhost:3000
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
POST http://localhost:3000/api/users/users/login HTTP/1.1
Host: localhost:3000
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
PUT http://localhost:3000/api/users/users/60c72b2f9e7f8e3a2c4d4567 HTTP/1.1
Host: localhost:3000
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

### Delete a User

**Request**

```http
DELETE http://localhost:3000/api/users/users/60c72b2f9e7f8e3a2c4d4567 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Success",
  "response": "User ID: 60c72b2f9e7f8e3a2c4d4567 has been successfully deleted."
}
```

---

### Talk with ChatGPT

**Request**

```http
POST http://localhost:3000/api/chatgpt/prompt HTTP/1.1
Host: localhost:3000
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
  "response": "Did you see it in a movie or read about it in a book?"
}
```

---

### Reset ChatGPT Conversation

**Request**

```http
POST http://localhost:3000/api/chatgpt/prompt HTTP/1.1
Host: localhost:3000
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
