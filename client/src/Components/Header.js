import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser } from "../features/auth/authSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { BellIcon, MenuIcon } from '@heroicons/react/outline';

const Header = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [notificationLength, setNotificationLength] = useState(0);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { t } = useTranslation("global");

  const { user_name } = useSelector((state) => state.auth.user);
  const { profile_picture } = useSelector((state) => state.auth.singleUser) || {};
  const { notificationId } = useSelector((state) => state.auth.notification || {});

  const prevNotificationId = useRef(notificationId);

  useEffect(() => {
    if (user_name) {
      dispatch(getSingleUser({ user_name }));
    }
  }, [dispatch, user_name]);

  useEffect(() => {
    const getAllOrderList = () => {
      axios
        .get("/users/notifications", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.notification);
          setNotification(response?.data?.notification);
          const unViewed = response?.data?.notification?.filter(
            (item) => item.isViwed === false
          );
          const realUnviewed = unViewed?.filter(
            (item) => item.Notify_Id !== notificationId
          );
          setNotificationLength(realUnviewed?.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllOrderList();
  }, [notificationId]);

  const handleProfileMenuOpen = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("my_app_store");
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="/assets/home.jpg"
                  alt="home"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/assets/home.jpg"
                  alt="home"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {role && (role.role === "Broker" || role.role === "Landlord") ? (
              <>
                <Link
                  to="/notification"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  {notificationLength > 0 && (
                    <span className="inline-block bg-red-600 text-white px-2.5 py-0.5 rounded-full">{notificationLength}</span>
                  )}
                </Link>
                <Link
                  to="/createHouse"
                  className="text-black font-bold hover:text-blue-700 ml-4"
                >
                  Post House
                </Link>
              </>
            ) : null}
          </div>
          <div className="ml-3 relative">
            <div>
              {profile_picture && (
                <img
                  alt="Home"
                  src={`${PF}${profile_picture}`}
                  className="h-8 w-8 rounded-full"
                />
              )}
            </div>
            <button
              onClick={handleProfileMenuOpen}
              type="button"
              className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {t("navbar.profile")}
          </Link>
          <Link
            to="/resetpassword"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {t("navbar.resetpassword")}
          </Link>
          <button
            onClick={handleLogOut}
            type="button"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {t("navbar.logout")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
