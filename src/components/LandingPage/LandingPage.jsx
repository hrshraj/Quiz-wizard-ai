import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow"></div>
        </div>

        {/* Magic Wands */}
        <div className="absolute top-10 left-10 transform -rotate-45 animate-bounce-slow">
          <span className="text-4xl">🪄</span>
        </div>
        <div className="absolute top-20 right-20 transform rotate-45 animate-bounce-delayed">
          <span className="text-4xl">🪄</span>
        </div>
        <div className="absolute bottom-20 left-20 transform rotate-12 animate-bounce-slow">
          <span className="text-4xl">🪄</span>
        </div>
        <div className="absolute bottom-10 right-10 transform -rotate-12 animate-bounce-delayed">
          <span className="text-4xl">🪄</span>
        </div>

        {/* Stars */}
        <div className="absolute top-32 left-32 animate-twinkle">
          <span className="text-3xl">✨</span>
        </div>
        <div className="absolute top-40 right-40 animate-twinkle-delayed">
          <span className="text-3xl">✨</span>
        </div>
        <div className="absolute bottom-40 left-40 animate-twinkle">
          <span className="text-3xl">✨</span>
        </div>
        <div className="absolute bottom-32 right-32 animate-twinkle-delayed">
          <span className="text-3xl">✨</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <img
              src="/Quiz Wizard logo with purple and white theme.png"
              alt="QuizWizard.ai"
              className="w-32 h-32 mx-auto rounded-full shadow-xl animate-float"
            />
          </div>
          <h1 className="text-5xl font-bold text-purple-800 mb-6">
            Welcome to QuizWizard.ai
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your magical companion for creating engaging and educational quizzes. Let our AI-powered platform help you generate high-quality questions in seconds!
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 text-xl font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-105 group"
          >
            <span className="group-hover:rotate-180 transition-transform duration-300">🪄</span>
            <span className="ml-2">Let the Magic Begin</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 