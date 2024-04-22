import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import Header from '../Components/Header';
import { GoogleLogin } from 'react-google-login';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Tenant');
  const [formErrors, setFormErrors] = useState({});
  const [photo, setPhoto] = useState(null); // Changed to null

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    // Append the photo to the formData
    formData.append('photo', photo);
    // Append other form data fields
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    // Dispatch register action with formData
    dispatch(register(formData));
  };

  const handleGoogleSignup = (googleData) => {
    const profile = googleData.getBasicProfile();
    setFirstName(profile.getGivenName());
    setLastName(profile.getFamilyName());
    setEmail(profile.getEmail());

    // Submit the form
    handleSubmit();
  };

  const handleGoogleSignupFailure = (error) => {
    console.error('Google Sign-Up failed:', error);
    // Handling Google Sign-Up failure
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.firstName ? 'border-red-500' : ''}`}
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.lastName ? 'border-red-500' : ''}`}
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.phone ? 'border-red-500' : ''}`}
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.address ? 'border-red-500' : ''}`}
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role:
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="Landlord">Landlord</option>
                <option value="Tenant">Tenant</option>
                <option value="Admin">Admin</option>
                <option value="Broker">Broker</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">
              Photo:
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.photo ? 'border-red-500' : ''}`}
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])} // Set photo state with selected file
            />
            {/* Error handling for photo */}
            {formErrors.photo && <p className="text-red-500 text-xs italic">{formErrors.photo}</p>}
          </div>
          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mb-4">
            <GoogleLogin
              clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
              buttonText="Sign up with Google"
              onSuccess={handleGoogleSignup}
              onFailure={handleGoogleSignupFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
