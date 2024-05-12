import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const onLogout = () => {
   navigate("/login");
  };

  return (
    <nav className="ml-4px border bg-white-300  text-white p-4">
      <ul className="flex ">
        <li>
          <Link to="/" className="text-black font-bold hover:text-blue-700">
            Home
          </Link>
        </li>

        <ul className="flex space-x-4 ml-auto">
          {!isLoggedIn && (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-black font-bold hover:text-blue-700"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-black font-bold hover:text-blue-700"
                >
                  Login
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button
                onClick={onLogout}
                className="text-red-500 font-bold hover:text-blue-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </ul>
    </nav>
  );
};

export default Header;
