# Task Management System (MERN Stack)



This application allows users to manage tasks and administrators to view system statistics. It features secure JWT authentication, soft-delete functionality, and MongoDB aggregation for analytics.

### Key Features
* **Authentication:** Secure Login/Register with Password Hashing (Bcrypt) and JWT
* **Role-Based Access Control (RBAC):**
    * **User:** Can Create, Read, Update, and Soft-Delete their own tasks
    * **Admin:** Can view all users and aggregated statistics (Total Tasks vs. Deleted Tasks)
* **Frontend:** Built with React + Vite + Tailwind CSS for a modern, responsive UI
* **Backend:** Node.js & Express with Modular Architecture (Routes, Controllers, Services).

---

## Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Security:** JWT (JSON Web Tokens), Bcryptjs, CORS

---

## Getting Started

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas Connection String)

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `server` folder and add your variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  Start the server:
    ```bash
    nodemon server.js
    ```
    *Server runs on: http://localhost:3000*

### 2. Frontend Setup

1.  Navigate to the client directory (open a new terminal):
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    *Frontend runs on: http://localhost:5173*

---

#### for admin please send post request to localhost:3000/api/auth/register with following raw data from postman

```JSON
{
    "userName": "admin",
    "email": "admin@admin.com",
    "password": "admin",
    "role": "admin"
}
```

---

## API Endpoints

* Postman Collection : https://www.postman.com/shantanu-kharade-9272208/workspace/shantanu-kharade-public/collection/49074979-67736391-0c48-4644-9268-24d1b244e6a8?action=share&creator=49074979

### Auth
* `POST /api/auth/register` - Register a new user (Role: 'user' or 'admin').
* `POST /api/auth/login` - Login and receive JWT.

### Tasks (Protected - User Only)
* `POST /api/task/create` - Create a new task.
* `GET /api/task/get` - Get all non-deleted tasks for the logged-in user.
* `PUT /api/task/update?taskId={id}` - Update a task.
* `DELETE /api/task/delete?taskId={id}` - Soft delete a task.

### Admin (Protected - Admin Only)
* `GET /api/user/admin/all-users` - Returns a list of users with counts for Created vs. Deleted tasks using MongoDB Aggregation.

---

##  Scalability & Architecture Note



To ensure this application allows for future growth and high traffic, the following architectural decisions were made:

1.  **Modular Service Layer:** Business logic is separated from Controllers (`service/` folder). This allows us to easily split services into independent microservices (e.g., an independent "Auth Service" or "Analytics Service") without rewriting the API layer.
2.  **Stateless Authentication:** Using JWT allows the backend to be horizontally scaled across multiple servers without needing sticky sessions or shared session storage
3.  **Database Indexing & Aggregation:** The Admin dashboard uses native MongoDB aggregation pipelines (`$lookup`, `$project`) rather than JavaScript loops. This pushes the computational load to the database engine, which is optimized for handling large datasets efficiently.
4.  **Soft Deletes:** Instead of permanently removing data, we use an `isDeleted` flag. This preserves data integrity for future analytics or "Undo" features, a critical requirement for enterprise-grade applications.


