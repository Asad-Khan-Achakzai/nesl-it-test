# Express + JWT Auth API with React Feed UI

This project consists of:
- A **Node.js + Express** backend with JWT-based role authorization
- A **React** frontend that displays a paginated feed
- Basic user roles: `admin` and `user`
- Protected routes using custom `authorize()` middleware

---

## 📦 Part 1: Schema Design & Index Notes

This app is fully in-memory (no database), but here’s the conceptual schema if a DB were used:

### 📄 Users (Hardcoded)

```json
[
  { "id": "u1", "role": "user" },
  { "id": "u2", "role": "admin" }
]
```
### 📄 Follows (Hardcoded)

```json
[
 {
  "follower": "u1",
  "following": "u2"
}
]
```
### 📄 Posts (Hardcoded)

```json
[
 {
  "_id": "p1",
  "author": "u2",
  "content": "Hello!",
  "created": "2024-03-10T18:00:00Z"
}
]
```

## 📦 Part 2: Setup Backend (API)

The backend is a **Node.js + Express** server that provides:

- 🔐 User login with JWT token generation
- ✅ Role-based authorization (e.g., only admins can delete posts)
- 📄 A `/feed` endpoint with pagination support

### 🛠 Steps to Run the Backend

```bash
cd api
npm install
npm start
```

- ✅ The backend runs on: http://localhost:3000



## 💻 Part 3: Frontend Setup (React UI)

The frontend is built with **React.js** and is responsible for:

- 🔐 Handling user login and storing JWT tokens
- 📰 Displaying a feed of posts with **infinite scroll**
- ✅ Sending authenticated requests to the backend

### 🛠 Steps to Run the Frontend

```bash
cd web
cd nesl-it-web
npm install
npm run dev
```

## 🧪 Part 4: Test Commands & Results

The backend uses **Jest** and **Supertest** to test protected routes and role-based access control.

---

### 🧪 What is Being Tested?

1. ✅ **Admin user** can successfully delete a post (`DELETE /posts/:id`)
2. 🚫 **Normal user** receives `403 Forbidden` when trying to delete a post
3. ❌ **Missing or invalid token** results in `401 Unauthorized`

---

### 🧾 How to Run Tests

```bash
cd api
npm test
---



