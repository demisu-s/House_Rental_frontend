//import data from "data";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Entity() {
    const [loggedIn, setLoggedIn] = useState(false)

    const handleSave = () => {

    }

    return(
        <div className="entity border rounded-xl overflow-hidden bg-white">
            <article className="lg:flex">
                <div className="relative flex-1">
                    <img className="w-full h-full" src="https://th.bing.com/th/id/OIP.ci1E7m8wCISyHZ6um8z01gHaDt?rs=1&pid=ImgDetMain" alt="a house" />
                    <div className="absolute bottom-2 right-2">
                        <label className="bg-fuchsia-950 py-1 px-2 rounded-full text-white mr-2">🖼1/11</label>
                        <label className="bg-fuchsia-950 py-1 px-2 rounded-full text-white mr-1">❕❕❕1</label>
                        <button className="bg-fuchsia-950 py-1 px-4 rounded-full text-white">▶ 1</button>
                    </div>
                </div>
                <div className="px-4 border flex-1">
                    <div className="flex justify-between py-4">
                        <label className="bg-yellow-500 py-2 px-4 rounded-full">JUST ADDED</label>
                        {
                        loggedIn ? <button onClick={handleSave}>🤍 <u>Save</u></button> 
                        : <Link 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline transition duration-300' 
                        to='/login' 
                        >
                            Get Started
                        </Link>
                        }
                    </div>

                    <p className="text-3xl font-bold mb-4">&pound;450,000</p>
                    <span className="text-3xl mr-4">🛏<sub className="text-sm">3</sub></span>
                    <span className="text-xl mr-4">🛁<sub className="text-sm">1</sub></span>
                    <span className="text-xl">🏠<sub className="text-sm">2</sub></span>

                    <h4 className="mt-4 font-bold text-lg">3 bed semi-detached house for sale</h4>
                    <address className="text-gray-500 mb-2">Mayfair Road, Oxford, Oxfordshire OX4</address>
                    <p className="mb-8">internally you are greeted by a porch, entrance hall with a separate reception followed by an extended living dining room with access to the rear ...</p>

                    <label className="border py-1 px-4 rounded-full">FREEHOLD</label>
                    <p className="mt-2 text-sm text-gray-500 mb-4">Listed on 13th Jan 2024</p>
                </div>
            </article>

            <article className="flex justify-between p-2">
                <label className=" flex items-center border px-2 bg-pink-950 text-white text-sm font-bold">Andrews<span className="text-red-500 text-3xl mb-1">&raquo;</span></label>

                <div>
                    <button className="mr-2"><span className="phone-icon text-transparent">📞</span> <sub><u>Call</u></sub></button>
                    <button><span>✉</span> <sub><u>Email</u></sub></button>
                </div>
            </article>
        </div>
    )
}