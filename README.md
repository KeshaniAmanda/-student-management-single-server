# 🎓 Student Management System - Single Node.js Server

Full-stack Student Management System එකක් **එක Node.js server එකකින්** - Backend API + Frontend සියල්ල එකම application එකක!

## ✨ Features

- 🔐 Firebase Authentication (Email/Password)
- 📊 Full CRUD Operations
- 🗄️ Firebase Firestore Database
- 🔒 JWT Auth Middleware
- 💅 Modern UI (Tailwind CSS + React)
- ⚡ Single Server Architecture
- 🚀 Easy Deployment

## 🛠️ Tech Stack

**Single Server:**
- Node.js + Express (Backend API + Frontend Host)
- Firebase Admin SDK (Backend Auth)
- Firebase Client SDK (Frontend Auth)
- React (CDN - No build required!)
- Tailwind CSS (CDN)

## 📋 Prerequisites

- Node.js (v16+)
- npm
- Firebase Account

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. https://console.firebase.google.com/
2. Click "Add Project"
3. Enter project name
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Click Save

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create Database**
3. Start in **test mode**
4. Select location: **asia-south1**
5. Click Enable

### 4. Get Firebase Config

**For Backend (Admin SDK):**
1. Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file

**For Frontend (Web App):**
1. Project Settings > General
2. Click web icon (`</>`)
3. Register app
4. Copy `firebaseConfig` values

## 📦 Installation

### 1. Download/Clone Project

```bash
cd student-management-single-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure .env File

Edit `.env` file:

```env
# Backend (from downloaded JSON file)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Frontend (from Firebase Console > Web App Config)
FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:xxxxx

# Server
PORT=3000
NODE_ENV=development
```

## 🚀 Running the Application

### Start Server

```bash
npm start
```

Server will run on: **http://localhost:3000**

- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

### Development Mode (Auto-restart)

```bash
npm run dev
```

## 📱 Usage

1. Open browser: `http://localhost:3000`
2. Click **Sign Up** to create account
3. Login with your credentials
4. **Add Student** - Create new student records
5. **Edit** - Update student information
6. **Delete** - Remove students

## 📂 Project Structure

```
student-management-single-server/
├── config/
│   └── firebase.js           # Firebase Admin config
├── middleware/
│   └── auth.js              # JWT auth middleware
├── routes/
│   └── students.js          # Student CRUD routes
├── public/
│   └── index.html           # Complete React app
├── server.js                # Main server file
├── package.json
└── .env
```

## 🎯 How It Works

### Single Server Architecture:

```
┌─────────────────────────────────────┐
│   Node.js Express Server (Port 3000) │
├─────────────────────────────────────┤
│  API Routes:                         │
│  - POST   /api/students              │
│  - GET    /api/students              │
│  - GET    /api/students/:id          │
│  - PUT    /api/students/:id          │
│  - DELETE /api/students/:id          │
│  - GET    /api/config                │
│  - GET    /api/health                │
├─────────────────────────────────────┤
│  Static Files:                       │
│  - GET    /  → index.html            │
│  - GET    /* → index.html (SPA)      │
└─────────────────────────────────────┘
```

### Benefits:

✅ **Simple Deployment** - Single server, single port
✅ **No Build Step** - React via CDN, no webpack/vite
✅ **Easy Configuration** - One `.env` file
✅ **Fast Development** - No separate frontend server
✅ **Production Ready** - Can deploy anywhere Node.js runs

## 🌐 Deployment Options

### Option 1: Render.com (Free)

1. Push code to GitHub
2. Go to https://render.com
3. Create New **Web Service**
4. Connect GitHub repository
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables from `.env`
7. Deploy!

### Option 2: Railway.app (Free)

1. Push code to GitHub
2. Go to https://railway.app
3. New Project > Deploy from GitHub
4. Select repository
5. Add Environment Variables
6. Deploy!

### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set FIREBASE_PROJECT_ID=...
heroku config:set FIREBASE_PRIVATE_KEY="..."
# ... (all other env vars)

# Deploy
git push heroku main
```

## 🔒 Security Notes

- `.env` file එක commit නොකරන්න
- `FIREBASE_PRIVATE_KEY` secure කරගන්න
- Production එකේ Firestore rules update කරන්න
- HTTPS use කරන්න production එකේ

## 🐛 Troubleshooting

### "Cannot GET /api"
✅ Normal - try `/api/health` or `/api/students`

### "Unauthorized" errors
✅ Check Firebase credentials in `.env`
✅ Verify token is being sent from frontend

### "DECODER routines error"
✅ Check `FIREBASE_PRIVATE_KEY` format
✅ Must include quotes and `\n` characters

### Port already in use
```bash
# Change PORT in .env
PORT=3001
```

## 📄 API Endpoints

### Students

**GET** `/api/students` - Get all students
**GET** `/api/students/:id` - Get single student
**POST** `/api/students` - Create student
**PUT** `/api/students/:id` - Update student
**DELETE** `/api/students/:id` - Delete student

All endpoints require:
```
Authorization: Bearer <firebase-token>
```

### Config

**GET** `/api/config` - Get Firebase config for frontend
**GET** `/api/health` - Health check

## 🎁 Advantages of This Architecture

1. **Single Codebase** - Everything in one project
2. **No CORS Issues** - Same origin for frontend/backend
3. **Easy Deployment** - Just deploy one app
4. **Fast Loading** - React from CDN, no build
5. **Simple Setup** - Just `npm install && npm start`

## 📝 License

MIT

---

Made with ❤️ - Single Server Architecture
