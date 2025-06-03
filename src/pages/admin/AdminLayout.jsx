// src/pages/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/logos.png';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-[#800000] text-white" : "text-gray-600 hover:bg-[#800000]/10";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-30">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <Link to="/admin" className="flex items-center space-x-3">
            <img src={logo} alt="Dhaqaaleeye Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold text-gray-800">Admin</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          <Link
            to="/admin"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive("/admin")}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive("/admin/users")}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Users</span>
          </Link>

          <Link
            to="/admin/incomes"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive("/admin/incomes")}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Incomes</span>
          </Link>

          <Link
            to="/admin/expenses"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive("/admin/expenses")}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Expenses</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 space-x-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen bg-gray-50">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            {location.pathname === "/admin" && "Dashboard"}
            {location.pathname === "/admin/users" && "User Management"}
            {location.pathname === "/admin/incomes" && "Income Records"}
            {location.pathname === "/admin/expenses" && "Expense Records"}
          </h1>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
