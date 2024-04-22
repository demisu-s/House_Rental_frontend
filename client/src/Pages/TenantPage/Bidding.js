import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder,removeNewOrder,removeOrderError } from "../../features/order/orderSlice";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import { BeatLoader } from "react-spinners";




import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Bidding = ({ title, description, setOpenOrderModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const { newOrder, errorOrder, loadingOrder } = useSelector((state) => state.order);
  const { role_name } = useSelector((state) => state.user.user.role);

  const [formData, setFormData] = useState({
    price: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      title: title,
      price_requested: formData.price,
    };
    
    if (role_name === "tenant") {
      dispatch(createOrder(order));
    }
  };

  useEffect(() => {
    if (newOrder) {
      setTimeout(() => {
        dispatch(removeNewOrder());
        setOpenOrderModal(false);
      }, 60000);
    }
  }, [newOrder]);

  useEffect(() => {
    if (errorOrder) {
      setTimeout(() => {
        dispatch(removeOrderError());
        setOpenOrderModal(false);
      }, 5000);
    }
  }, [errorOrder]);

  useEffect(() => {
    if (newOrder) {
      setTimeout(() => {
        toast.success("Request done successfully.");
        navigate(`/details/${title}`);
      }, 60000);
    }
  }, [newOrder]);

  return (
    <div className="bg-white rounded-md p-10 w-full sm:w-2/4 md:w-1/2 lg:w-1/3 mx-auto">
      <h5 className="text-center text-blue-500 font-semibold text-xl md:text-2xl">
        {t("moveorder.ordertitle")}
      </h5>
      {loadingOrder && (
        <div className="text-center">
          <ClipLoader color={"#36d7b7"} loading={loadingOrder} size={50} aria-label="Loading Spinner" />
        </div>
      )}
      {errorOrder && (
        <div className="bg-red-500 text-white text-center text-lg p-3 rounded-md mb-5">
          {t("moveorder.error")}
        </div>
      )}
      {newOrder && (
        <div className="bg-blue-500 text-white text-center text-lg p-3 rounded-md mb-5 flex justify-center items-center">
          <p className="mr-3">Processing takes some time</p>
          <BeatLoader color={"#fff"} loading={newOrder} size={10} aria-label="Loading Spinner" />
        </div>
      )}
      <form onSubmit={handleOrder}>
        <div className="mb-5">
          <TextField
            label={t("moveorder.quantity")}
            name="price"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            className="mb-5"
          />
        </div>
        <button
          type="submit"
          disabled={newOrder || loadingOrder}
          className="bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-md w-full"
        >
          {newOrder ? t("moveorder.orderloading") : t("moveorder.order")}
        </button>
      </form>
    </div>
  );
};

export default Bidding;
