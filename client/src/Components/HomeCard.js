import React, { useState } from "react";
import { Link } from "react-router-dom";

import OrderComponent from "./Order";
import { useSelector } from "react-redux";

const HomeCard = ({
  title,
  price,
  images,
  availability,
  
}) => {
  const { role_name } = useSelector((state) => state.user.user.Role);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  

  const handleClickModal = () => {
    setOpenOrderModal(true);
  };

//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   console.log(PF);

  return (
    <div className="bg-white p-5 border border-blue-500 rounded-lg flex flex-col items-start gap-5 shadow-md">
      <img
        src={`/uploads`}
        alt="home image"
        className="w-full rounded-md object-fill"
      />
      <div className="w-full">
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            {t("home.title")}
          </h6>
          <p className="text-blue-500 flex-1">{title}</p>
        </div>
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            {t("home.price")}
          </h6>
          <p className="text-blue-500 flex-1">{price}</p>
        </div>
        <div className="flex items-center gap-10">
          <h6 className="text-blue-500 font-semibold text-lg md:text-xl flex-1">
            {t("home.available")}
          </h6>
          <p className="text-blue-500 flex-1">{availability}</p>
        </div>
      </div>
      <div className="w-full flex items-center gap-15">
        {(role_name === "tenant") && (
          <button
            className="text-blue-500 border border-blue-500 rounded-lg py-2 px-4 text-lg md:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => handleClickModal()}
          >
            {t("home.order")}
          </button>
        )}
        <div className={role_name === "tenant" ? "flex-1.3" : "flex-1"}>
          <Link to={`/details/${price}`}>
            <button
              className="text-blue-500 border border-blue-500 rounded-lg py-2 px-4 text-lg md:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all"
            >
              {t("home.detail")}
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

export default HomeCard;
