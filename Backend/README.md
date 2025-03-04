# Backend API Documentation

## /users/register

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string (optional).
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success
- **Status** `201 Created`
- **Body**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "message": "All fields are required"
  }
  ```
  This error occurs if any of the required fields are missing.

- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Error message"
  }
  ```
  This error occurs if there is an issue with the server or database.

### Validation
The following validations are performed on the request body:
- `email` must be a valid email address.
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.

### Example Request
```sh
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "message": "User registered successfully"
}
```

## /users/login

### Description
This endpoint is used to log in an existing user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success
- **Status** `200 OK`
- **Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "john.doe@example.com",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    }
  }
  ```

#### Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
  This error occurs if the validation fails.

- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
  This error occurs if the email or password is incorrect.

- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Error message"
  }
  ```
  This error occurs if there is an issue with the server or database.

### Validation
The following validations are performed on the request body:
- `email` must be a valid email address.
- `password` must be at least 6 characters long.

### Example Request
```sh
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

## /users/profile

### Description
This endpoint is used to get the profile of the logged-in user.

### Method
`GET`

### Headers
- `Authorization`: Bearer token

### Response

#### Success
- **Status** `200 OK`
- **Body**:
  ```json
  {
    "user": {
      "id": "user_id",
      "email": "john.doe@example.com",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    }
  }
  ```

#### Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```
  This error occurs if the user is not authenticated.

### Example Request
```sh
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer jwt_token"
```

### Example Response
```json
{
  "user": {
    "id": "user_id",
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

## /users/logout

### Description
This endpoint is used to log out the user.

### Method
`GET`

### Headers
- `Authorization`: Bearer token

### Response

#### Success
- **Status** `200 OK`
- **Body**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```
  This error occurs if the user is not authenticated.

### Example Request
```sh
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer jwt_token"
```

### Example Response
```json
{
  "message": "Logout successful"
}
```