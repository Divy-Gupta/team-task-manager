
# Team Task Manager 🚀

A full-stack Team Task Manager web application where Admins can create projects, assign tasks to team members, and track progress with role-based access.

---

# 🌟 Features

## 🔐 Authentication

* User Signup
* User Login
* Role-Based Access (Admin / Member)

## 👨‍💼 Admin Features

* Create Projects
* Delete Projects
* Create Tasks
* Assign Tasks to Members
* Delete Tasks
* View All Tasks

## 👨‍💻 Member Features

* View Only Assigned Tasks
* Update Task Status

  * Pending
  * In Progress
  * Completed

## 📊 Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Total Projects
* Active Projects
* Pending Projects
* Completed Projects

## 🗄️ Backend Features

* REST APIs using FastAPI
* SQLite Database
* SQLAlchemy ORM
* CRUD Operations
* Role-Based Access

---

# 🛠️ Tech Stack

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* FastAPI
* Python
* SQLAlchemy
* SQLite

---

# 📂 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── auth.py
│   ├── requirements.txt
│   └── taskmanager.db
│
├── frontend/
│   ├── index.html
│   ├── signup.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# ⚙️ Local Setup

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-link>
```

---

## 2️⃣ Backend Setup

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend will run on:

```bash
http://127.0.0.1:8000
```

---

## 3️⃣ Frontend Setup

Open:

```bash
index.html
```

using Live Server in VS Code.

---

# 🚂 Railway Deployment

# 🔹 Backend Deployment on Railway

## Step 1

Push project to GitHub.

---

## Step 2

Open:

[https://railway.app](https://railway.app)

---

## Step 3

Login with GitHub.

---

## Step 4

Click:

```bash
New Project
```

---

## Step 5

Select:

```bash
Deploy from GitHub Repo
```

---

## Step 6

Choose your repository.

---

## Step 7

In Railway Settings:

### Root Directory

```bash
backend
```

---

## Step 8

Add Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Step 9

Deploy 🚀

---

# 🌐 Frontend Deployment on Netlify

## Step 1
Open Netlify and login with GitHub.

## Step 2
Click:
Add New Site → Deploy manually

## Step 3
Upload frontend files:
- index.html
- signup.html
- style.css
- script.js

## Step 4
Deploy the site.

## Step 5
Update API URL inside script.js with Railway backend URL.

---

# 🔗 API Configuration

In `script.js`, replace:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

with your Railway backend URL:

```javascript
const API_URL = "https://your-backend-url.up.railway.app";
```

---

# 🎥 Demo Video

Show:

1. Signup
2. Login
3. Admin Dashboard
4. Create Project
5. Assign Task
6. Member Login
7. Update Task Status
8. Admin Tracking Progress

---

# 📌 Future Improvements

* Dark Mode
* User Dropdown for Task Assignment
* JWT Authentication Middleware
* Email Notifications
* Team Chat Feature

---

# 👨‍💻 Developed By

Divy Gupta

GitHub:
[https://github.com/DIVY-GUPTA](https://github.com/DIVY-GUPTA)
