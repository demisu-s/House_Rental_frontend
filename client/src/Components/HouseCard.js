import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderComponent from "./Order";
import { useSelector } from "react-redux";

const HouseCard = ({
  title,
  description,
  bedrooms,
  bathrooms,
  address,
  square_feet,
  price,
  images,
  availability,
}) => {
  const { role } = useSelector((state) => state.user.role); // Corrected useSelector
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const handleClickModal = () => {
    setOpenOrderModal(true);
  };

  return (
    <div className="bg-white p-5 border border-blue-500 rounded-lg flex flex-col items-start gap-5 shadow-md">
      <img
        src={`/uploads`} // Update this with the correct image source
        alt="home image"
        className="w-full rounded-md object-fill"
      />
      <div className="w-full">
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            Title
          </h6>
          <p className="text-blue-500 flex-1">{title}</p>
        </div>
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            Price
          </h6>
          <p className="text-blue-500 flex-1">{price}</p>
        </div>
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            Availability
          </h6>
          <p className="text-blue-500 flex-1">{availability}</p>
        </div>
      </div>
      <div className="w-full flex items-center gap-15">
        {role === "tenant" && ( // Corrected role name
          <button
            className="text-blue-500 border border-blue-500 rounded-lg py-2 px-4 text-lg md:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => handleClickModal()}
          >
            Order
          </button>
        )}
        <div className={role === "tenant" ? "flex-1.3" : "flex-1"}> // Corrected role name
          <Link to={`/details/${price}`}>
            <button
              className="text-blue-500 border border-blue-500 rounded-lg py-2 px-4 text-lg md:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all"
            >
              Detail
            </button>
          </Link>
        </div>
      </div>

      {openOrderModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 border border-blue-500 rounded-lg shadow-md">
            <OrderComponent
              title={title}
              price={price}
              setOpenOrderModal={setOpenOrderModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseCard;
