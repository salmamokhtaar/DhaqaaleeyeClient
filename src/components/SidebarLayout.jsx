import React from 'react';
import { FaHome, FaWallet, FaMoneyBill, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logos.png';

const SidebarLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="User" className="w-20 h-20  mb-2" />
            <h1 className="text-lg font-bold text-gray-800">{user?.name || 'User'}</h1>
          </div>
          <nav className="space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded ${isActive('/dashboard') ? 'bg-[#800000] text-white' : 'text-gray-700 hover:text-[#800000]'}`}>
              <FaHome /> Dashboard
            </button>
            <button
              onClick={() => navigate('/income')}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded ${isActive('/income') ? 'bg-[#800000] text-white' : 'text-gray-700 hover:text-[#800000]'}`}>
              <FaWallet /> Income
            </button>
            <button
              onClick={() => navigate('/expense')}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded ${isActive('/expense') ? 'bg-[#800000] text-white' : 'text-gray-700 hover:text-[#800000]'}`}>
              <FaMoneyBill /> Expense
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-3 text-gray-700 hover:text-red-700 px-4 py-2 w-full">
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default SidebarLayout;
