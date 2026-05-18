# 🎫 SecureDesk – Secure Ticketing & Support System

A full-stack web application built for an EdTech platform focused on cybersecurity courses. Users (learners) can raise course-related support tickets and administrators can manage and resolve them.

---

## 🛠️ Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | React.js, Bootstrap 5      |
| Backend  | Node.js, Express.js        |
| Database | MongoDB (Atlas)            |
| Auth     | JWT (JSON Web Tokens)      |
| Security | bcryptjs, Input Validation |

---

## ✅ Features

### 👤 User Module

- Register & Login with JWT Authentication
- Create support tickets with title, description & priority
- View all personal submitted tickets with status

### 🛡️ Admin Module

- Admin Login
- View all tickets from all users
- Real-time stats (Open / In Progress / Resolved)
- Update ticket status via dropdown

### 🔒 Security

- JWT-based Authentication
- Password Hashing with bcryptjs
- Protected Routes (User & Admin)
- Input Validation on all endpoints

---

## 📁 Project Structure

```
secure-ticketing-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ticketController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Ticket.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   └── AdminDashboard.js
│       ├── utils/
│       │   └── axios.js
│       ├── App.js
│       └── index.js
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free)
- [Git](https://git-scm.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/secure-ticketing-system.git
cd secure-ticketing-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

> Backend runs on: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

> Frontend runs on: `http://localhost:3000`

---

## 🔗 API Endpoints

### Auth Routes

| Method | Endpoint           | Description       | Access |
| ------ | ------------------ | ----------------- | ------ |
| POST   | /api/auth/register | Register new user | Public |
| POST   | /api/auth/login    | Login user        | Public |

### Ticket Routes

| Method | Endpoint         | Description          | Access     |
| ------ | ---------------- | -------------------- | ---------- |
| POST   | /api/tickets     | Create a ticket      | User       |
| GET    | /api/tickets     | Get my tickets       | User       |
| GET    | /api/tickets/all | Get all tickets      | Admin only |
| PUT    | /api/tickets/:id | Update ticket status | Admin only |

---

## 👥 Default Roles

| Role  | Access                          |
| ----- | ------------------------------- |
| user  | Create & view own tickets       |
| admin | View all tickets, update status |

> You can select your role during registration.

---

## 📸 Screenshots

> Add screenshots of your app here after deployment.

---

## 🔐 Security Highlights

- All passwords hashed using **bcryptjs**
- JWT tokens expire after **7 days**
- Admin routes protected with **role-based middleware**
- Frontend routes protected with **PrivateRoute & AdminRoute**

---

## 📬 Contact

**Puneet Sethi**
📧 mr.puneetsethi@gmail.com
🔗 [GitHub](https://github.com/yourusername)
