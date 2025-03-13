import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaMagic, FaDoorOpen, FaUsers, FaHome } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/generate', icon: <FaMagic />, label: 'Generate Questions' },
    { path: '/create-room', icon: <FaDoorOpen />, label: 'Create Room' },
    { path: '/join-room', icon: <FaUsers />, label: 'Join Room' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-white/70 backdrop-blur-sm shadow-xl transition-all duration-300 relative flex-shrink-0`}
        >
          {/* Toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-8 bg-purple-700 text-white rounded-full p-2 shadow-lg hover:bg-purple-800 transition-colors duration-200"
          >
            {isSidebarOpen ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
          </button>

          {/* Logo */}
          <Link to="/" className="block p-4">
            <div className="flex items-center space-x-4">
              <img
                src="/Quiz Wizard logo with purple and white theme.png"
                alt="QuizWizard.ai"
                className="h-12 w-12 rounded-full transition-transform duration-200 hover:scale-110"
              />
              {isSidebarOpen && (
                <span className="text-xl font-bold text-purple-700 whitespace-nowrap hover:text-purple-800 transition-colors duration-200">
                  QuizWizard.ai
                </span>
              )}
            </div>
          </Link>

          {/* Navigation */}
          <nav className="mt-8 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 p-3 rounded-lg mb-2 transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-600 hover:bg-purple-100'
                }`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-50 to-white">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout; 