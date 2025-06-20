
# 🔗 Shortify | URL Shortener Project | lost set bit 

A sleek and powerful full-stack URL shortener built with **React**, **Redux Toolkit**, **Node.js**, and **MongoDB**. Users can register, log in, shorten links, and track click counts with a modern UI and secure backend.

---

## 📁 Project Structure

```
URL-Shortner-Project/
├── backend/       # Node.js + Express API + MongoDB
└── frontend/      # React + Tailwind + Redux Toolkit
```

---

## 🚀 Getting Started

### 🔄 Clone the Repository

```bash
git clone https://github.com/your-username/URL-Shortner-Project.git
cd URL-Shortner-Project
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file in `/backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
APP_URL=http://localhost:3000/
JWT_SECRET=your_secret_key
```

### Start the Backend Server

```bash
# Option 1: Recommended
npx nodemon app.js

# Option 2:
node app.js

# Option 3 (if you've defined it in package.json):
npm run dev
```

Your backend will run on: `http://localhost:3000`

---

## 🌐 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Your frontend will be available at: `http://localhost:5173`

---

## 🔐 Environment Summary

| Variable       | Description                     |
|----------------|---------------------------------|
| `MONGO_URI`    | MongoDB connection string       |
| `APP_URL`      | Frontend base URL               |
| `JWT_SECRET`   | Secret key for signing JWT      |

---

## ✅ Features

- 🔒 Secure authentication with JWT
- 🔗 Shorten long URLs
- 📊 Track click counts
- 📂 Dashboard for managing all your links
- 📋 Copy-to-clipboard short URLs
- 🌐 Responsive modern UI
- 🖼 Avatar + dropdown menu
- ⏱ Auto-refresh URLs list every 30 seconds

---

## 🛠 Tech Stack

### Frontend:
- React (Vite)
- Tailwind CSS
- Redux Toolkit
- React Query (TanStack)
- TanStack Router
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- bcrypt, dotenv, cors

---

## 👨‍💻 Author

**Ashish Kumar Verma**

- GitHub: [@ashishverma4822](https://github.com/ashishverma4822)

---

## 🧪 Quick Tips

- Run `npm install` in both `backend/` and `frontend/`
- Make sure MongoDB is running or use MongoDB Atlas
- Do not forget to create `.env` file before running backend
