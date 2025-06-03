import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logos.png';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // 👈 import useAuth

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 👈 get setUser

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', formData);
    const token = res.data.token;
    localStorage.setItem('token', token);

    // Fetch the logged-in user's full data including role
    const userRes = await axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const loggedUser = userRes.data;
    setUser(loggedUser); // save to context

    toast.success('Logged in successfully!');

    // 👉 Redirect based on role
    if (loggedUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }

  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Image Side */}
        <div className="md:w-1/2 bg-white hidden md:flex items-center justify-center">
          <img src={logo} alt="Login Illustration" className="w-3/4" />
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#800000] mb-6">Welcome to Dhaqaaleeye</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1" placeholder="********" required />
            </div>
            <button type="submit" className="w-full bg-[#800000] text-white py-2 rounded hover:bg-red-900 transition">Login</button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account? <Link to="/signup" className="text-[#800000] font-semibold">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
