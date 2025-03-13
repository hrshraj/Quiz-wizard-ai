import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaMagic, FaDoorOpen, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/generate', icon: <FaMagic />, text: 'Generate Questions' },
    { path: '/create-room', icon: <FaDoorOpen />, text: 'Create Room' },
    { path: '/join-room', icon: <FaUsers />, text: 'Join Room' },
  ];

  return (
    <div
      className={`bg-purple-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-purple-800 text-white p-1 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
      >
        {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex items-center space-x-4">
          <img
            src="Quiz Wizard logo with purple and white theme.png"
            alt="QuizWizard.ai"
            className="h-10 w-10 rounded-full"
          />
          <span className={`font-bold text-xl transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            QuizWizard
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-700 border-r-4 border-white'
                      : 'hover:bg-purple-700'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`ml-4 transition-opacity duration-200 ${
                    isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
                  }`}
                >
                  {item.text}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Decorative Elements */}
      <div className={`absolute bottom-8 left-4 transition-opacity duration-200 ${
        isCollapsed ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="text-2xl animate-bounce-slow">✨</div>
        <div className="text-2xl mt-4 animate-float">🪄</div>
      </div>
    </div>
  );
};

export default Sidebar; 