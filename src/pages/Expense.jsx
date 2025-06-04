// ✅ Updated Expense.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaMoneyBill, FaCalendarAlt, FaSpinner, FaShoppingCart } from 'react-icons/fa';
import SidebarLayout from '../components/SidebarLayout';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ category: '', amount: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://dhaqaaleeyeserver.onrender.com/api/expense', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setExpenses(res.data);
      const total = res.data.reduce((acc, curr) => acc + Number(curr.amount), 0);
      setTotalExpense(total);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://dhaqaaleeyeserver.onrender.com/api/expense/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Expense updated successfully');
      } else {
        await axios.post('https://dhaqaaleeyeserver.onrender.com/api/expense', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Expense added successfully');
      }
      fetchExpenses();
      setFormData({ category: '', amount: '', date: '' });
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to save expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setFormData({ category: expense.category, amount: expense.amount, date: expense.date.split('T')[0] });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`https://dhaqaaleeyeserver.onrender.com/api/expense/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Expense deleted successfully');
        fetchExpenses();
      } catch (err) {
        toast.error('Failed to delete expense');
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <SidebarLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Expense Management</h2>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#600000] transition-colors flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#800000]"
          >
            <FaPlus className="w-5 h-5" /> Add Expense
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">${totalExpense.toFixed(2)}</h3>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center shadow-inner">
              <FaShoppingCart className="w-7 h-7 text-red-600" />
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  id="category"
                  type="text"
                  placeholder="e.g., Food, Transport, Bills"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                    type="date"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-[#800000] text-white px-6 py-2 rounded-lg hover:bg-[#600000] transition-colors flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  {editingId ? 'Update Expense' : 'Save Expense'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ category: '', amount: '', date: '' });
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Expense List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Expense History</h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <FaSpinner className="w-8 h-8 text-[#800000] animate-spin" />
            </div>
          ) : expenses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No expenses recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{expense.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-red-600">- ${Number(expense.amount).toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium\">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            title="Edit Expense\"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            title="Delete Expense\"
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

export default Expense;
