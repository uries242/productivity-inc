# TaskMaster API
A secure RESTful API backend for Productivity Inc TaskMaster application. Built with Node.js, Express, MongoDB, and Mongoose. Supports user authentication, project management, and task tracking with ownership-based authorization.


## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt


## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account and cluster URI

### Installation
1. Clone the repository:
   git clone <your-repo-url>
   cd productivity-inc

2. Install dependencies:
   npm install

3. Create a .env file in the root directory:

4. Start the server:
   node server.js


## Project Structure
productivity-inc/
├── config/
│   └── db.js           # MongoDB connection
├── models/
│   ├── User.js         # User schema
│   ├── Project.js      # Project schema
│   └── Task.js         # Task schema
├── routes/
│   ├── userRoutes.js   # Auth endpoints
│   ├── projectRoutes.js # Project CRUD endpoints
│   └── taskRoutes.js   # Task CRUD endpoints
├── utils/
│   └── auth.js         # JWT authentication middleware
├── server.js           # Entry point
├── .env                # Environment variables (not committed)
└── .gitignore


## API Endpoints

### Authentication
All protected routes require a Bearer token in the Authorization header:

### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/users/register | Register a new user | No |
| POST | /api/users/login | Login and receive a JWT | No |

### Project Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/projects | Create a new project |
| GET | /api/projects | Get all projects for logged-in user |
| GET | /api/projects/:id | Get a single project (owner only) | 
| PUT | /api/projects/:id | Update a project (owner only) |
| DELETE | /api/projects/:id | Delete a project (owner only) | 

### Task Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/projects/:projectId/tasks | Create a task for a project (owner only) | 
| GET | /api/projects/:projectId/tasks | Get all tasks for a project (owner only) |
| PUT | /api/projects/tasks/:taskId | Update a task (parent project owner only) | 
| DELETE | /api/projects/tasks/:taskId | Delete a task (parent project owner only) |

## Authorization Rules
- All project and task routes are protected by JWT middleware
- Users can only access and modify their own projects
- Task authorization works by verifying ownership of the parent project
- Unauthorized access returns 403 Forbidden
- Missing token returns `401 Unauthorized`


## Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| username | String | Required, unique |
| email | String | Required, unique |
| password | String | Required, hashed via bcrypt pre-save hook |

### Project
| Field | Type | Notes |
|-------|------|-------|
| name | String | Required |
| description | String | Optional |
| user | ObjectId | Ref: User — the owner |

### Task
| Field | Type | Notes |
|-------|------|-------|
| title | String | Required |
| description | String | Optional |
| status | String | Enum: 'To Do', 'In Progress', 'Done' |
