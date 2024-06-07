import React from 'react';
import PropertiesCard from '../Components/PropertiesCard';
import { Link } from 'react-router-dom';

const PropertiesForRent = () => {
  return (
    <div className='bg-[hsl(0,14%,96%)] max-w-[1000px] flex flex-col justify-center my-10 mx-auto  rounded-md rounded-b-none h-fit'>
      <div className='block'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='mx-0 ml-2 mt-2 text-1xl font-bold'>Houses from Oxford</h1>
            <h3 className='ml-2 mb-8'>604 results</h3>
          </div>
          <div>
            <Link to='/somewhere' className='mr-2 underline'>Sort most recent</Link>
          </div>
        </div>
      </div>

      <PropertiesCard />
    </div>
  );
};

export default PropertiesForRent;
