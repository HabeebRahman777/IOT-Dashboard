import React, { useState } from 'react';
import SignupPage from './SignupPage'; 
import AddDevicePage from './AddDevicePage';
import {useNavigate} from 'react-router-dom'

const AdminPage = () => {
  const navigate=useNavigate()
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Panel</h1>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => navigate('/admin/signup')}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Signup New User
        </button>

        <button
          onClick={() => navigate('/admin/add-device')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Device to Existing User
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
