// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logos.png';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dhaqaaleeyeserver.onrender.com/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Image Side */}
        <div className="md:w-1/2 bg-white hidden md:flex items-center justify-center">
          <img src={logo} alt="Signup Illustration" className="w-3/4" />
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#800000] mb-6">Create an Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1" placeholder="********" required />
            </div>
            <button type="submit" className="w-full bg-[#800000] text-white py-2 rounded hover:bg-red-900 transition">Sign Up</button>
            <p className="text-sm text-center text-gray-600">
              Already have an account? <Link to="/login" className="text-[#800000] font-semibold">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
