
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-700 text-white'>
      <h1 className='text-4xl font-bold mb-6'>Welcome to Our Website</h1>
      <p className='text-lg mb-8'>
        Explore incredible alternative rental homes at affordable rates for your convenience.
      </p>
      <Link
        to='/login'
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
