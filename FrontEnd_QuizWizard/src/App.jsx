import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import GenerateQuestions from './components/GenerateQuestions/GenerateQuestions';

// Basic layout with just header and footer
const BasicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gradient-to-br from-purple-50 to-white">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Placeholder components for other routes
const CreateRoom = () => <div className="p-6"><h1 className="text-3xl font-bold text-purple-800">Create Room</h1></div>;
const JoinRoom = () => <div className="p-6"><h1 className="text-3xl font-bold text-purple-800">Join Room</h1></div>;
const About = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-purple-800 mb-6">About QuizWizard.ai ✨</h1>
    <div className="prose lg:prose-xl">
      <p className="text-gray-600">
        QuizWizard.ai is your magical companion in creating engaging and educational quizzes. 
        Our AI-powered platform helps educators, students, and quiz enthusiasts generate 
        high-quality questions across various subjects and difficulty levels.
      </p>
      <p className="text-gray-600 mt-4">
        With our intuitive interface and powerful features, you can create, share, and 
        participate in quizzes that make learning fun and interactive.
      </p>
    </div>
  </div>
);

const Contact = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-purple-800 mb-6">Contact Us 📬</h1>
    <div className="prose lg:prose-xl">
      <p className="text-gray-600">
        Have questions or suggestions? We'd love to hear from you! 
        Reach out to our support team at support@quizwizard.ai
      </p>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-purple-700">Connect With Us</h2>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-purple-700 transition-colors duration-200">Twitter</a>
          <a href="#" className="text-gray-600 hover:text-purple-700 transition-colors duration-200">LinkedIn</a>
          <a href="#" className="text-gray-600 hover:text-purple-700 transition-colors duration-200">Facebook</a>
        </div>
      </div>
    </div>
  </div>
);

const Privacy = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-purple-800 mb-6">Privacy Policy 🔒</h1>
    <div className="prose lg:prose-xl">
      <p className="text-gray-600">
        At QuizWizard.ai, we take your privacy seriously. This privacy policy outlines how we 
        collect, use, and protect your personal information.
      </p>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-purple-700">Data Collection</h2>
        <p className="text-gray-600">
          We collect only the necessary information required to provide you with our services, 
          including but not limited to your email address and quiz preferences.
        </p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page with BasicLayout */}
        <Route element={<BasicLayout />}>
          <Route index element={<Home />} />
        </Route>
        
        {/* All other routes with Layout */}
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="generate" element={<GenerateQuestions />} />
          <Route path="create-room" element={<CreateRoom />} />
          <Route path="join-room" element={<JoinRoom />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          {/* Redirect any unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
