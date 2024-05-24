import React from 'react'
import { Link } from 'react-router-dom';
const Premium = () => {
  return (
    <div>
        <Link to="/premium">
       <button className='text-2xl bg-[#1a325a] rounded-xl ml-6 mb-2 mt-4 text-[hsl(278,6%,75%)]'>Available</button>
       </Link>
    </div>
  )
}

export default Premium
