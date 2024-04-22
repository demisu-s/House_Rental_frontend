import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, editUsers } from "../features/auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Header from "../Components/Header";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    role: "",
    photo: ""  
  });

  const { email } = useSelector((state) => state.auth.user || {});
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.isError);
  const isSuccess = useSelector((state) => state.auth.isSuccess);

  useEffect(() => {
    dispatch(getSingleUser());
    dispatch({ type: 'auth/setLoading', payload: true }); // Dispatch action to set loading to true
    axios
      .post(`/getuserinfo/${email}`, { withCredentials: false })
      .then((response) => {
        dispatch(getSingleUser(response.data));
        setProfileInfo({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address || "",
          phone: response.data.phone || "",
          email: response.data.email || "",
          photo: response.data.photo || "",
          role: response.data.role.role_name
        });
        dispatch({ type: 'auth/setLoading', payload: false }); // Dispatch action to set loading to false
      })
      .catch((error) => {
        dispatch({ type: 'auth/setLoading', payload: false }); // Dispatch action to set loading to false
        dispatch({ type: 'auth/setError', payload: true }); // Dispatch action to set error to true
        setTimeout(() => {
          dispatch({ type: 'auth/setError', payload: false }); // Dispatch action to set error to false after 5 seconds
        }, 5000);
        console.log(error);
      });
  }, [dispatch, email]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value
    });
  };

  const handleUpdateProfile = () => {
    dispatch({ type: 'auth/setLoading', payload: true }); // Dispatch action to set loading to true
    editUsers(profileInfo)
      .then((response) => {
        dispatch(editUsers(response.data));
        dispatch({ type: 'auth/setLoading', payload: false }); // Dispatch action to set loading to false
        dispatch({ type: 'auth/setSuccess', payload: true }); // Dispatch action to set success to true
        setTimeout(() => {
          dispatch({ type: 'auth/setSuccess', payload: false }); // Dispatch action to set success to false after 5 seconds
        }, 5000);
      })
      .catch((error) => {
        dispatch({ type: 'auth/setLoading', payload: false }); // Dispatch action to set loading to false
        dispatch({ type: 'auth/setError', payload: true }); // Dispatch action to set error to true
        setTimeout(() => {
          dispatch({ type: 'auth/setError', payload: false }); // Dispatch action to set error to false after 5 seconds
        }, 5000);
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex-grow p-9">
          <div className="p-5 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center items-center md:items-start">
                <div className="flex flex-col items-center md:items-start w-full md:w-3/4 mx-auto">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-5"
                    src={profileInfo.photo}
                    alt="User"
                  />
                  <div className="w-full">
                    {isLoading && (
                      <div className="text-center">
                        <ClipLoader
                          color={"#36d7b7"}
                          isLoading={true}
                          size={50}
                          aria-label="Loading Spinner"
                        />
                      </div>
                    )}
                    {isError && (
                      <div className="bg-red-500 text-white text-lg p-3 rounded-md my-5 text-center">
                        Can not get your data
                      </div>
                    )}
                    {Object.keys(profileInfo).map((key) => (
                      <div
                        key={key}
                        className="p-2 flex flex-col md:flex-row items-center"
                      >
                        <div className="text-blue-900 flex-1">
                          <span className="font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="font-normal">
                            {profileInfo[key]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h5 className="text-blue-900 text-center mb-5">
                  Update Profile
                </h5>
                {isLoading && (
                  <div className="text-center">
                    <ClipLoader
                      color={"#12596B"}
                      isLoading={true}
                      size={50}
                      aria-label="Loading Spinner"
                    />
                  </div>
                )}
                {isError && (
                  <div className="bg-red-500 text-white text-lg p-3 rounded-md my-5 text-center">
                    Please fill all field required
                  </div>
                )}
                {isSuccess && (
                  <div className="bg-blue-900 text-white text-lg p-3 rounded-md my-5 text-center">
                    Updated Successfully
                  </div>
                )}
                <div>
                  <label
                    htmlFor="first_name"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="firstName"
                    value={profileInfo.firstName}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  <label
                    htmlFor="last_name"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="lastName"
                    value={profileInfo.lastName}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  
                  <label
                    htmlFor="address"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileInfo.address}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  <label
                    htmlFor="phone"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileInfo.phone}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  <label
                    htmlFor="email"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={profileInfo.email}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  <label
                    htmlFor="role"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={profileInfo.role}
                    onChange={handleFormChange}
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  <label
                    htmlFor="photo"
                    className="text-blue-900 text-lg font-medium mb-2 block"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        photo: e.target.files[0]
                      })
                    }
                    className="w-full bg-gray-200 py-2 px-3 mb-3"
                  />
                  
                  <button
                    onClick={handleUpdateProfile}
                    className="w-full bg-blue-500 text-white py-2 px-3 rounded-md text-lg font-medium hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
