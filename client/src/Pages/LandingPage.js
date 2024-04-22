import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='relative bg-cover bg-center flex flex-col items-center justify-center h-screen text-white' style={{backgroundImage: `url(${require("../assets/Manor-house.jpg")})`, padding: '0 20px'}}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-8">
        <h1 className='text-5xl font-bold mb-8 text-red-500'>Welcome to Our Website</h1>
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
    </div>
  );
};

export default LandingPage;
