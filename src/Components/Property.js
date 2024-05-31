import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Property() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = () => {
        navigate('/dashboard');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return(
        <div className="lg:flex gap-2 border-b-2 pb-4">
            <div className="relative flex-1">
                <label htmlFor="location" className="block mb-2">Enter a location</label>
                <input className="w-full border mb-4 lg:mb-0 py-2 pl-2 rounded-sm" type="text" name="location"/>
                <button className="absolute right-1 top-10">X</button>
            </div>

            <div className="flex-1">
                <label htmlFor="radius" className="block mb-2">Radius</label>
                <select className="border w-full mb-4 lg:mb-0 py-2 rounded-sm" name="radius">
                    <option value="">This area only</option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="bedrooms" className="block mb-2">Bedrooms</label>
                <select className="border w-full mb-4 lg:mb-0 py-2 rounded-sm" name="bedrooms">
                    <option value="">Any beds</option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>
            
            <div className="flex-1">
                <label htmlFor="price" className="block mb-2">Price</label>
                <select className="border w-full mb-4 lg:mb-0 py-2 rounded-sm" name="price">
                    <option value="">Any price</option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="property-type" className="block mb-2">Property type</label>
                <select className="border w-full mb-4 lg:mb-0 py-2" name="property-type rounded-sm">
                    <option value="">Show all</option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>

            <div className="flex self-end gap-2">
                <button className="border px-4 py-2 rounded-sm">🗄 Filters</button>
                <form onSubmit={ loggedIn ? handleSubmit : handleLogin}>
                    <button className="border px-4 py-2 rounded-sm bg-indigo-700 text-white">Dashboard</button>
                </form>
            </div>
        </div>
    )
}