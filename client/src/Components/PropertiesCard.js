import React from "react";
import Premium from "./Premium";

const urlImage =
  "https://images.unsplash.com/photo-1542228227152-511d6b6bbe1c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PropertiesCard = () => {
  return (
    <div className="bg-[hsl(143,69%,90%)]">
      <Premium />
      <div className="flex flex-wrap justify-between mb-1">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-2">
          <div className="bg-white ml-2 mr-2">
            <img
              src={urlImage}
              className="rounded-md w-full"
              alt="Property Image"
            />
            <div className="my-2 ml-4">
              <p className="text-sm mt-1">
                It has five room and clean view glass
              </p>
              <h2 className="font-semibold">Location:Oxford</h2>
              <h3>Register for service</h3>
              <p className="my-2">price:9000ETB</p>
              <button className="text-[rgba(113,236,241,0.92)] text-2xl w-20 px-1 py-1 font-extrabold ">
                {" "}
                Peabody
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-2">
          {/* Repeat the same structure for the third card */}
          <div className="bg-white ml-2 mr-2">
            <img
              src={urlImage}
              className="rounded-md w-full"
              alt="Property Image"
            />
            <div className="my-2 ml-4">
              <p className="text-sm mt-1">
                It has five room and clean view glass
              </p>
              <h2 className="font-semibold">Location:Oxford</h2>
              <h3>Register for service</h3>
              <p className="my-2">price:9000ETB</p>
              <button className="text-[rgba(113,236,241,0.92)] text-2xl w-20 px-1 py-1 font-extrabold ">
                {" "}
                Peabody
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-2">
          <div className="bg-white ml-2 mr-2">
            <img
              src={urlImage}
              className="rounded-md w-full"
              alt="Property Image"
            />
            <div className="my-2 ml-4">
              <p className="text-sm mt-1">
                It has five room and clean view glass
              </p>
              <h2 className="font-semibold">Location:Oxford</h2>
              <h3>Register for service</h3>
              <p className="my-2">price:9000ETB</p>

              <button className="text-[rgba(113,236,241,0.92)] text-2xl w-20 px-1 py-1 font-extrabold  ">
                {" "}
                Peabody
              </button>
            </div>
          </div>
        </div>

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default PropertiesCard;
