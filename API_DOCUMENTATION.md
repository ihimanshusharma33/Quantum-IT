# User API Documentation

## Base URL

Replace `Base_URL` with your actual server address (e.g., `http://localhost:4000/api`).

## Authentication

Protected endpoints require a JWT token to be included in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Register a User

**Endpoint:** `POST Base_URL/users/register`

**Description:** Register a new user and receive a JWT token.

**Request Body:**
```json
{
  "name": "Himanshu Sharma",
  "dateOfBirth": "2002-09-08",
  "email": "himanshusharma@gmail.com",
  "password": "securepassword"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "user": {
    "_id": "6814d9241bec27facc483e21",
    "name": "Himanshu sharma",
    "dateOfBirth": "2002-09-07T18:30:00.000Z",
    "email": "himanshusharma@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

### Login User

**Endpoint:** `POST Base_URL/users/login`

**Description:** Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "himanshusharma@gmail.com",
  "password": "securepassword"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "_id": "6814d9241bec27facc483e21",
    "name": "Himanshu sharma",
    "dateOfBirth": "2002-09-07T18:30:00.000Z",
    "email": "himanshusharma@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Get All Users (Protected)

**Endpoint:** `GET Base_URL/users`

**Description:** Get a list of all registered users. Requires authentication.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 2,
  "users": [
    {
      "_id": "67c87032777bfbc18ee64413",
      "username": "Himanshu Sharma",
      "email": "Hs991009@gmail.com",
      "__v": 0
    },
    {
      "_id": "6814d9241bec27facc483e21",
      "name": "Himanshu sharma",
      "dateOfBirth": "2002-09-07T18:30:00.000Z",
      "email": "himanshusharma@gmail.com",
      "createdAt": "2025-05-02T14:39:32.333Z",
      "updatedAt": "2025-05-02T14:39:32.333Z",
      "__v": 0
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

## How to Use the API

### 1. Register a New User

Send a POST request to `Base_URL/users/register` with user details. If successful, you'll receive a JWT token to use for authenticated requests.

### 2. Login with Existing User

Send a POST request to `Base_URL/users/login` with email and password. If credentials are correct, you'll receive a JWT token.

### 3. Access Protected Routes

For protected routes like `GET Base_URL/users`, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Example API Calls

### Using cURL

#### Register:
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Himanshu Sharma",
    "dateOfBirth": "2002-09-08",
    "email": "himanshusharma@gmail.com",
    "password": "securepassword"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "himanshusharma@gmail.com",
    "password": "securepassword"
  }'
```

#### Get All Users (Protected):
```bash
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Fetch API (JavaScript)

#### Register:
```javascript
fetch('http://localhost:4000/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Himanshu Sharma",
    dateOfBirth: "2002-09-08",
    email: "himanshusharma@gmail.com",
    password: "securepassword"
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

#### Login:
```javascript
fetch('http://localhost:4000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: "himanshusharma@gmail.com",
    password: "securepassword"
  })
})
.then(response => response.json())
.then(data => {
  // Save token for future authenticated requests
  localStorage.setItem('token', data.token);
  console.log(data);
});
```

#### Get All Users (Protected):
```javascript
fetch('http://localhost:4000/api/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```