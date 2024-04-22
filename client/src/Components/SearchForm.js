import React from "react";

const SearchForm = () => {
  const top100Films = ["test", "eyyre", "shhsh"];
  return (
    <div className="mb-8">
      <div className="relative w-full md:w-60 mx-auto">
        <input
          type="text"
          placeholder="House List"
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400 transition duration-300 ease-in-out transform hover:text-blue-500 hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchForm;
