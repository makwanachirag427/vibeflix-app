# 🎬 Vibeflix App

![Screenshot (127)](https://github.com/user-attachments/assets/3e203dac-06b3-4a76-9a06-1d07bf51cc29)


**Vibeflix** is a full-stack movie trailer streaming application that allows users to:

- 🔍 Search for **movies**, **TV shows**, and **actors**
- 📜 Maintain a **search history**
- ⭐ Add items to a **watchlist**
- ▶️ Watch **trailers** using React Player
- 🔐 Secure authentication with **JWT** and **bcrypt**

Built with the **MERN Stack**, **Zustand**, **Tailwind CSS**, and **React Player**.

---

## 🚀 Live Demo

🔗 [View Live App](https://vibeflix-app.onrender.com/)

---

## 🧰 Tech Stack

**Frontend:**

- React
- Zustand (State Management)
- Tailwind CSS
- React Player

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Hashing)

---

## 📸 Features

- User Registration & Login (JWT Authentication)
- Search for movies, TV shows, and actors
- Watch trailers via React Player
- Add/remove items from personal watchlist
- Search history tracking per user

---
```bash
## 📦 Installation

Follow the steps below to run the project locally:


# 1. Clone the repository
git clone https://github.com/makwanachirag427/vibeflix-app.git
cd vibeflix-app

# 2. Install dependencies
npm install

# 3. Set up backend environment variables
# Create a .env file in the root folder 'vibeflix-app' and add the following:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# NODE_ENV=development

# 4. Start the backend server
npm run dev

# 5. Open a new terminal and install frontend dependencies
cd ../frontend
npm install

# 6. Start the frontend app
npm start
