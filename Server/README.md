Here’s an improved and detailed version of your API documentation with some additional explanations and FAQs for clarity:

---

# API Documentation

This API supports **User Management** and **ChatGPT Interaction** functionalities.

**Base URL**: `https://iitc-b-backend-server-akinator-project-w.onrender.com`

---

## Authentication

- **Token-Based Authentication (JWT)**:
  - Upon successful **Login**, a JWT token is issued.
  - Include the token in the **request body** under the key `"token"` for all **protected endpoints**.
  - **Token Expiry**: Tokens expire after 1 hour. Users need to re-login to acquire a new token when it expires.

---

## Endpoints

### 1. **User Management Endpoints**

#### **Create New User**

- **Method**: `POST`
- **Endpoint**: `/api/users/register`
- **Description**: Allows the creation of a new user account.

**Request Body**:

```json
{
  "fName": "John",
  "user": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}
```

**Response**:

- **Status**: `201 Created`
- **Example**:

```json
{
  "message": "User successfully registered.",
  "user": {
    "_id": "user_id",
    "fName": "John",
    "user": "john_doe",
    "email": "john@example.com"
  }
}
```

##### FAQs:

1. **Is the password encrypted?**  
   A: Yes, passwords are securely hashed before storage.

---

#### **Login User**

- **Method**: `POST`
- **Endpoint**: `/api/users/login`
- **Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### FAQs:

1. **What happens if the credentials are incorrect?**  
   A: A `401 Unauthorized` error is returned with the message: `"Invalid email or password."`

2. **How long does the token last?**  
   A: Tokens are valid for 1 hour from the time of login.

---

#### **Update User Data**

- **Method**: `PUT`
- **Endpoint**: `/api/users/:id`
- **Description**: Updates a user's details. Requires authentication via token.

**URL Parameters**:

- `:id` - The unique identifier for the user being updated.

**Request Body**:

```json
{
  "token": "<jwt_token>",
  "fName": "John Updated",
  "user": "john_updated",
  "email": "new_email@example.com"
}
```

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "message": "User updated successfully.",
  "user": {
    "_id": "user_id",
    "fName": "John Updated",
    "user": "john_updated",
    "email": "new_email@example.com"
  }
}
```

##### FAQs:

1. **Can I update only one field?**  
   A: Yes, only the fields provided in the request body will be updated.

2. **What happens if the token is missing?**  
   A: A `401 Unauthorized` error is returned.

---

#### **Delete User**

- **Method**: `DELETE`
- **Endpoint**: `/api/users/:id`
- **Description**: Deletes a user account by their unique ID.

**URL Parameters**:

- `:id` - The unique identifier of the user to delete.

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "message": "User deleted successfully."
}
```

##### FAQs:

1. **Can an admin delete another user?**  
   A: The API does not include admin-specific functionality unless explicitly configured.

2. **What happens if the user ID does not exist?**  
   A: A `404 Not Found` error is returned.

---

#### **Get User by ID**

- **Method**: `GET`
- **Endpoint**: `/api/users/:id`
- **Description**: Retrieves a user’s information by their ID.

**URL Parameters**:

- `:id` - The unique identifier of the user to retrieve.

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "user": {
    "_id": "user_id",
    "fName": "John",
    "user": "john_doe",
    "email": "john@example.com"
  }
}
```

##### FAQs:

1. **Does this endpoint return sensitive user data?**  
   A: No, sensitive information like passwords is excluded.

2. **Can this endpoint be used without a token?**  
   A: No, it requires authentication.

---

### 2. **ChatGPT Interaction Endpoints**

#### **Talk with GPT**

- **Method**: `POST`
- **Endpoint**: `/api/chatgpt/prompt`
- **Description**: Sends a prompt to ChatGPT and receives a response. Requires authentication.

**Request Body**:

```json
{
  "token": "<jwt_token>",
  "text": ""
}
```

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "message": "Success",
  "response": "Is it a character from a movie?"
}
```

##### FAQs:

1. **What should I send as the first prompt?**  
   A: Send an empty string (`""`) to initiate the default conversation.

2. **Can I customize the conversation style?**  
   A: Yes, provide specific prompts in the `text` key.

---

#### **Reset Conversation**

- **Method**: `POST`
- **Endpoint**: `/api/chatgpt/clear`
- **Description**: Resets the ongoing conversation. Requires authentication.

**Request Body**:

```json
{
  "token": "<jwt_token>",
  "text": "clear"
}
```

**Response**:

- **Status**: `200 OK`
- **Example**:

```json
{
  "message": "Conversation reset successfully."
}
```

##### FAQs:

1. **When should I reset the conversation?**  
   A: Use this when you want to start a new topic or clear prior context.

2. **Does this endpoint clear token data?**  
   A: No, it only clears the conversation history.

---

## Error Handling

- **400 Bad Request**: Request is malformed or missing required fields.
- **401 Unauthorized**: Authentication issues such as missing, invalid, or expired tokens.
- **403 Forbidden**: User lacks permission for the requested action.
- **404 Not Found**: Resource does not exist or is unavailable.
- **500 Internal Server Error**: Unexpected server-side error.

---
