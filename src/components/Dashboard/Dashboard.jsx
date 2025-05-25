import React from 'react';
import { Link } from 'react-router-dom';
import { FaMagic, FaDoorOpen, FaUsers } from 'react-icons/fa';

// Add this CSS at the top of your file or in your global styles
const magicalStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 6s ease-in-out 2s infinite;
  }

  .animate-float-slow {
    animation: float 8s ease-in-out 1s infinite;
  }

  .animate-spin-slow {
    animation: spin 12s linear infinite;
  }

  .animate-spin-slow-delayed {
    animation: spin 12s linear 2s infinite;
  }

  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }

  .animate-twinkle-delayed {
    animation: twinkle 3s ease-in-out 1.5s infinite;
  }
`;

const DashboardCard = ({ to, icon, title, description }) => (
  <Link
    to={to}
    className="flex flex-col items-center p-8 bg-white/30 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group"
  >
    <div className="text-4xl text-purple-700 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-purple-800 mb-2">{title}</h2>
    <p className="text-gray-600 text-center">{description}</p>
  </Link>
);

const Dashboard = () => {
  const options = [
    {
      to: '/generate',
      icon: <FaMagic />,
      title: 'Generate Questions',
      description: 'Create AI-powered quiz questions instantly'
    },
    {
      to: '/create-room',
      icon: <FaDoorOpen />,
      title: 'Create Room',
      description: 'Host a live quiz session'
    },
    {
      to: '/join-room',
      icon: <FaUsers />,
      title: 'Join Room',
      description: 'Participate in an existing quiz'
    }
  ];

  return (
    <>
      <style>{magicalStyles}</style>
      <div className="min-h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow"></div>

          {/* Magic Wand Decorations */}
          <div className="absolute top-10 left-10 transform -rotate-45 animate-float">
            <span className="text-4xl">🪄</span>
          </div>
          <div className="absolute top-20 right-20 transform rotate-45 animate-float-delayed">
            <span className="text-4xl">🪄</span>
          </div>
          <div className="absolute bottom-20 left-20 transform rotate-12 animate-float-slow">
            <span className="text-4xl">🪄</span>
          </div>
          <div className="absolute bottom-10 right-10 transform -rotate-12 animate-float-delayed">
            <span className="text-4xl">🪄</span>
          </div>

          {/* Stars Decorations */}
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

          {/* Additional Magical Elements */}
          <div className="absolute top-1/2 left-10 animate-spin-slow">
            <span className="text-2xl">🌟</span>
          </div>
          <div className="absolute top-1/3 right-12 animate-spin-slow-delayed">
            <span className="text-2xl">🌟</span>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float">
            <span className="text-2xl">🎭</span>
          </div>
          <div className="absolute top-1/4 right-1/4 animate-float-delayed">
            <span className="text-2xl">🎨</span>
          </div>
          
          {/* Wizard Hat and Book */}
          <div className="absolute top-16 left-1/2 animate-float-slow">
            <span className="text-4xl">🧙‍♂️</span>
          </div>
          <div className="absolute bottom-16 right-1/3 animate-float">
            <span className="text-3xl">📚</span>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl w-full">
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-12">
            Choose Your Magical Journey ✨
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((option) => (
              <DashboardCard key={option.to} {...option} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 