# 🩺 Personalised Health Companion

A smart AI & IoT-based web platform that helps users manage their health, monitor vitals, chat/video consult with doctors, track lifestyle, and get medical assistance – all from one personalized dashboard.

🌐 **[Live Demo](https://personalized-health-companion.vercel.app/)**

---

## 🚀 Features
- 🧑‍⚕️ Doctor consultation via real-time chat & video call
- 📅 Appointment scheduling and tracking
- 🚨 Health alerts by analyzing patient vitals using AI
- 💡 Personalized lifestyle improvement tips powered by AI
- 🧠 AI Health Assistant for user queries
- 🛡️ Role-based dashboards for users and doctors
- 📊 Live IoT health stats (heart rate, SpO2, etc.)
- 🥗 Lifestyle tracker: sleep, exercise, diet, stress & more
- 🧾 Medical history, prescriptions, and reports management

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS, Tailwind CSS, Socket.IO
- **Backend**: Node.js, Express.js, MongoDB
- **AI Integration**: Ollama, Google Gemini API

---

## 🧑‍💻 Project Setup

1. **MongoDB Setup**  
   Create a new database and update the MongoDB URI in:  
   `backend/config/db.js`

2. **Environment Variables**  
   Add the following in respective `.env` files:

   - **Backend**  
     `JWT_SECRET_KEY`, `GEMINI_API_KEY`

   - **Frontend**  
     `VITE_BACKEND_URL`

3. **Install & Run**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   npm run dev
