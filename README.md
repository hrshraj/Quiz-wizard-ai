
# 🎓 QuizWizard.ai

**QuizWizard.ai** is a full-stack web app that helps teachers, students, and creators generate high-quality quizzes using AI (LlaMa 3 8B via OpenRouter). It features Google login (Firebase Auth), PDF export, and a clean dashboard interface.





---

## 🚀 Features

- 🔐 **Secure Google Login** via Firebase
- 🤖 **AI-based Quiz Generation** using OpenRouter API
- 📄 **Downloadable Quiz PDFs** with optional explanations
- 📊 Dashboard UI built with React + Tailwind CSS
- 🌐 Hosted on **Vercel**, backend on **Flask**
- ☁️ Environment Variables for API key safety

---


---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/QuizWizard.ai.git
cd QuizWizard.ai

2. Install Frontend Dependencies
npm install

3. Create a .env file in the root of the front end:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
VITE_FIREBASE_APP_ID=1:xxxxxxx:web:xxxxxxxxx
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX

4. Run Backend (Flask)
Navigate to Backend-For-QuizWizard/:
cd Backend-For-QuizWizard
python app.py

5. Start the Frontend
npm run dev


