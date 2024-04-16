import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_ORDER } from "../State/ReduxSaga/Types/orderType";
import { removeNewOrder, removeOrderError } from "../State/ReduxToolkit/Slices/orderSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { setNewPropertyList } from "../State/ReduxToolkit/Slices/propertySlice";
import toast from "react-hot-toast";
 
const OrderComponent = ({ title, price, setOpenOrderModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderNew, setOrderNew] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("global");
  const { newOrder, errorOrder, loadingOrder } = useSelector((state) => state.order);
  const { role_name } = useSelector((state) => state.user.user.Role);
  const { languange } = useSelector((state) => state.languange);

  const [formData, setFormData] = useState({
    quantity: "",
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
      item_name: title,
      item_no: item_number.toString(),
      quantity_requested: formData.quantity,
    };
    console.log(order);
    if (role_name !== "manager") {
      dispatch({ type: CREATE_ORDER, order });
    } else {
      setLoading(true);
      axios
        .post("/manager/makeRequest", order, { withCredentials: true })
        .then((response) => {
          dispatch(
            setNewPropertyList({
              item_number: order?.item_no,
              quantity: order?.quantity_requested,
            })
          );
          setLoading(false);
          setOrderNew(true);
          setTimeout(() => {
            toast.success("Request done successfully.");
            navigate(`/details/${item_number}`);
          }, 60000);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (newOrder || orderNew) {
      setTimeout(() => {
        dispatch(removeNewOrder());
        setOpenOrderModal(false);
        setOrderNew(false);
      }, 60000);
    }
  }, [newOrder, orderNew]);

  useEffect(() => {
    if (errorOrder || error) {
      setTimeout(() => {
        dispatch(removeOrderError());
        setOpenOrderModal(false);
        setError(false);
      }, 5000);
    }
  }, [errorOrder, error]);

  useEffect(() => {
    if (newOrder) {
      setTimeout(() => {
        toast.success("Request done successfully.");
        navigate(`/details/${item_number}`);
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
      {loading && (
        <div className="text-center">
          <ClipLoader color={"#36d7b7"} loading={loading} size={50} aria-label="Loading Spinner" />
        </div>
      )}
      {errorOrder && (
        <div className="bg-red-500 text-white text-center text-lg p-3 rounded-md mb-5">
          {t("moveorder.error")}
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white text-center text-lg p-3 rounded-md mb-5">
          {t("moveorder.error")}
        </div>
      )}
      {(newOrder || orderNew) && (
        <div className="bg-blue-500 text-white text-center text-lg p-3 rounded-md mb-5 flex justify-center items-center">
          <p className="mr-3">
            Processing takes some time
          </p>
          <BeatLoader color={"#fff"} loading={newOrder} size={10} aria-label="Loading Spinner" />
        </div>
      )}
      <form onSubmit={handleOrder}>
        <div className="mb-5">
          <TextField
            label={t("moveorder.quantity")}
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            className="mb-5"
          />
        </div>
        <button
          type="submit"
          disabled={newOrder || orderNew || loadingOrder}
          className="bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-md w-full"
        >
          {newOrder || orderNew ? t("moveorder.orderloading") : t("moveorder.order")}
        </button>
      </form>
    </div>
  );
};

export default OrderComponent;
