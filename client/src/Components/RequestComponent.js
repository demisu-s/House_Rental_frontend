import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationId } from "../features/notification/notificationSlice";
import ScaleLoader from "react-spinners/ScaleLoader";

const RequestComponent = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const getAllNotificationList = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);
      axios
        .get("/tenant/notifications", {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data.notification);
          setNotifications(response?.data?.notification);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getAllNotificationList();
  }, []);

  const handleUpdateNotification = async (id) => {
    await axios
      .get(`/tenant/notifications/update/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="px-5.5 py-3">
      {loading ? (
        <div className="w-full h-[calc(100vh-60px)] flex items-start justify-center">
          <ScaleLoader
            color={"#36d7b7"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex items-center flex-col">
          {sortedNotifications?.map((item, index) => (
            <Link
              to={`/notification/${item?.Notify_Id}`}
              key={index}
              onClick={() => {
                handleUpdateNotification(item?.Notify_Id);
                dispatch(setNotificationId(item?.Notify_Id));
              }}
              className="w-full md:w-[70%] bg-lightgray p-4 mb-6 flex gap-6 relative hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              {item?.isViwed ? null : (
                <div className="w-6 h-6 bg-red-500 rounded-full absolute top-2 right-4 flex items-center justify-center text-white">
                  1
                </div>
              )}

              <div className="flex-1 flex items-center justify-center md:justify-start">
                <img
                  src={`${PF}${item?.senderProfilePicture}`}
                  alt="NaN"
                  className="w-16 h-16 rounded-full border-2 border-blue-800 object-cover"
                />
              </div>
              <div className="flex-4">
                <div className="flex gap-2 items-center mb-2">
                  <div className="text-blue-800 font-semibold">
                    {("notification.from")}
                  </div>
                  <div className="text-blue-800">
                    {item?.senderFirstName + " " + item?.senderLastName}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-blue-800 font-semibold">
                    {("notification.message")}
                  </div>
                  <div className="text-blue-800">
                    {truncateText(item?.description, 30)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestComponent;
