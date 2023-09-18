# CRUD App

Project Description: [This is mobile-first MERN stack project (using React.js). The project's main features include:]

- Users can view a dashboard with a name, profile picture, and description.
- Users can update their name, description, and profile picture.
- Users can save the changes they make.
- Users can view profiles created by other users.
- Ensure the backend reflects the changes made.
- Hosted the project on GitHub and [Heroku](https://frozen-beach-67023-0ddcb760f77b.herokuapp.com/).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication Endpoints](#Authentication-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- React.js
- MongoDB
- cloudinary for image upload

## Getting Started

[Provide instructions on how to get the project up and running locally.]

```bash
# Clone the repository
git clone https://github.com/mxhdiqaim/sandbox-crud-app.git

# Change directory to the project folder
cd sandbox-crud-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Endpoints

#### Get Users Profile

**Endpoint:** `/api/users` <br>
**Purpose:** Retrieve the profile information of all users. <br>
**HTTP Method:** GET <br>
**Request URL Example:** http://localhost:8123/api/users
**Response Example:**

```
[
  {
    "_id": "123",
    "name": "John Doe",
    "email": "john@doe.com",
    "description": "Web Developer",
    "avatar": {
      public_id: "123",
      avatar_url: "https://your-app-domain.com/uploads/johndoe.jpg"
    }
  },
  {
    "_id": "123",
    "name": "John Doe",
    "email": "john@doe.com",
    "description": "Web Developer",
    "avatar": {
      public_id: "123",
      avatar_url: "https://your-app-domain.com/uploads/johndoe.jpg"
    }
  }
]

```

### Update User Profile

**Endpoint:** `/api/users/:id` <br>
**Purpose:** Allow a user to update their profile information. <br>
**HTTP Method:** PUT
**Request URL Example:** http://localhost:8123/api/users/123 <br>
**Request Body Example:**

```JSON
{
    "name": "musa Isa",
    "image": "image",
    "email": "mail@jm.com"
}

```

**Response Example:**

```
{
    "avatar": {
        "public_id": "images/xkyy7znnafhsq56eorsx",
        "avatar_url": "http://res.cloudinary.com/dybytasor/image/upload/v1695047124/images/xkyy7znnafhsq56eorsx.webp"
    },
    "_id": "65082766512eb4d755b7f3aa",
    "name": "musa Isa",
    "email": "me@variobel.sk",
    "password": "$2a$10$WuzwwPu9BK8nbb4CXTq1le.2udR/nXLaUi55AZvDsCFrl22rnzLAu",
    "date": "2023-09-18T10:33:10.704Z",
    "__v": 0,
    "description": "This is a description"
}
```

#### Get Loggedin User

**Endpoint:** /api/auth <br>
**Purpose:** Retrieve a list of all user profiles created in the app. <br>
**HTTP Method:** GET <br>
**Request URL Example:** https://your-app-domain.com/api/profiles<br>
**Response Example:** <br>

```
{
    "avatar": {
        "public_id": "images/xkyy7znnafhsq56eorsx",
        "avatar_url": "http://res.cloudinary.com/dybytasor/image/upload/v1695047124/images/xkyy7znnafhsq56eorsx.webp"
    },
    "_id": "65082766512eb4d755b7f3aa",
    "name": "Mahdi Abubakar",
    "email": "me@variobel.sk",
    "date": "2023-09-18T10:33:10.704Z",
    "__v": 0,
    "description": "This is a description"
}
```

## Authentication Endpoints

These endpoints handle user registration, authentication, and retrieving user information.

### Register a User

- **Endpoint:** POST `/api/users` <br>
- **Purpose:** Register a new user in the system. <br>
- **Request Body Example:**

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

```

- **Response Example:**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz..."
}
```

- **Error Responses:**
- - **400 Bad Request:** Invalid request data or missing fields.
- - **409 Conflict:** User with the same email already exists.
- - **500 Internal Server Error:** Server error.

### Login

- **Endpoint:** POST `/api/auth` <br>
- **Purpose:** Authenticate a user and generate a JWT token. <br>
- **Request Body Example:**

```
{
  "email": "john@example.com",
  "password": "password123"
}

```

- **Response Example:**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz..."
}
```

- **Error Responses:**
- - **401 Unauthorized:** Invalid credentials. <br>
- - **500 Internal Server Error:** Server error. <br>

### Get Logged-In User

- **Endpoint:** GET `/api/auth` <br>
- **Purpose:** Retrieve information about the currently logged-in user using their JWT token. <br>
- **Headers:** Include the JWT token in the Authorization header as `x-auth-token`. <br>
- **Response Example:**

```
{
    "avatar": {
        "public_id": "images/xkyy7znnafhsq56eorsx",
        "avatar_url": "http://res.cloudinary.com/dybytasor/image/upload/v1695047124/images/xkyy7znnafhsq56eorsx.webp"
    },
    "_id": "65082766512eb4d755b7f3aa",
    "name": "Mahdi Abubakar",
    "email": "me@variobel.sk",
    "date": "2023-09-18T10:33:10.704Z",
    "__v": 0,
    "description": "This is a description"
}
```

- **Error Responses:**
- - **401 Unauthorized:** Token is missing or invalid.
- - **500 Internal Server Error:** Server error.

## Database Schema

This is User Schema

```
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    avatar_url: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
```

## Deployment

Deployed to Heroku

## License

[Specify the project's license. For example, you can use an open-source license like MIT.]

```
Copy code
MIT License
```

Copyright (c) [2023] [Mahdi Abubakar]
