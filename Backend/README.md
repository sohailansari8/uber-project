# Backend API Documentation

## /captains/register

### Description
This endpoint is used to register a new captain.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string (optional).
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters.
  - `plate`: A string with a minimum length of 3 characters.
  - `capacity`: A number representing the capacity of the vehicle.
  - `vehicleType`: A string that must be one of `['car', 'van', 'bus']`.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success
- **Status** `201 Created`
- **Body**:
  ```json
  {
    "captain": {
      "id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token"
  }
  ```

#### Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email format",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "Firstname must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Color must be at least 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be a number",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```
  This error occurs if the validation fails.

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
- `fullname.firstname` must be at least 3 characters long.
- `vehicle.color` must be at least 3 characters long.
- `vehicle.plate` must be at least 3 characters long.
- `vehicle.capacity` must be a number.
- `vehicle.vehicleType` must be one of `['car', 'van', 'bus']`.

### Example Request
```sh
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

### Example Response
```json
{
  "captain": {
    "id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "jwt_token"
}
```