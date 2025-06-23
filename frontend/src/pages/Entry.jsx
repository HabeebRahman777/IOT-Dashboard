import React from 'react'
import { useNavigate } from 'react-router-dom';

const Entry = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col pb-16 h-screen items-center justify-center'>
    <div className="flex flex-col items-center justify-center text-center p-10 rounded-xl bg-white/80 mx-auto shadow-2xl max-w-lg">
          <p className="text-2xl font-semibold text-gray-700">
            Make your room control effortless 😉
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-md"
          >
            Let's Start
          </button>
    </div>
    </div>
  )
}

export default Entry