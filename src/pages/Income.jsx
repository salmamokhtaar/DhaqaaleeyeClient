import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaMoneyBill, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import SidebarLayout from '../components/SidebarLayout';
import { toast } from 'react-toastify';

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({ source: '', amount: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('https://dhaqaaleeyeserver.onrender.com/api/income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(res.data);
      const total = res.data.reduce((acc, curr) => acc + Number(curr.amount), 0);
      setTotalIncome(total);
    } catch (error) {
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editingId) {
        await axios.put(`https://dhaqaaleeyeserver.onrender.com/api/income/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Income updated successfully');
      } else {
        await axios.post('https://dhaqaaleeyeserver.onrender.com/api/income', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Income added successfully');
      }
      setFormData({ source: '', amount: '', date: '' });
      setShowForm(false);
      setEditingId(null);
      fetchIncomes();
    } catch (error) {
      toast.error('Failed to save income');
    }
  };

  const handleEdit = (income) => {
    setEditingId(income._id);
    setFormData({
      source: income.source,
      amount: income.amount,
      date: income.date.split('T')[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`https://dhaqaaleeyeserver.onrender.com/api/income/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Income deleted successfully');
        fetchIncomes();
      } catch (error) {
        toast.error('Failed to delete income');
      }
    }
  };

  return (
    <SidebarLayout>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Income Management</h2>
            <p className="text-gray-600 mt-1">Track and manage your income sources</p>
          </div>
          <button
            className="mt-4 sm:mt-0 bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#600000] transition-colors flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#800000]"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlus className="w-5 h-5" /> Add Income
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Income</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">${totalIncome.toFixed(2)}</h3>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
              <FaMoneyBill className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? 'Edit Income' : 'Add New Income'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Income Source</label>
                <input
                  id="source"
                  name="source"
                  type="text"
                  placeholder="e.g., Salary, Freelance, Investment"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                  value={formData.source}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-[#800000] text-white px-6 py-2 rounded-lg hover:bg-[#600000] transition-colors flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  {editingId ? 'Update Income' : 'Save Income'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ source: '', amount: '', date: '' });
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Income List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Income History</h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <FaSpinner className="w-8 h-8 text-[#800000] animate-spin" />
            </div>
          ) : incomes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No income recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {incomes.map((income) => (
                    <tr key={income._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{income.source}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">+ ${Number(income.amount).toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleEdit(income)}
                            className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            title="Edit Income"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(income._id)}
                            className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            title="Delete Income"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Income;
