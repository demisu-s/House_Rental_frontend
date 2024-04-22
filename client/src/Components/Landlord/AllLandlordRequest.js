import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentRequestPage, setCurrentRequestPage } from "../../features/request/requestSlice";
import LandlordRequestAccepted from "./LandlordRequestAccepted";
import LandlordRequestPending from "./LandlordRequestPending";
import LandlordRequestDeclined from "./LandlordRequestDeclined";

import { ThumbDownAltIcon, ThumbUpAltIcon, PendingIcon } from "@mui/icons-material";

const AllLandlordRequest = () => {
  const dispatch = useDispatch();
  const { currentRequestPage } = useSelector((state) => state.request);
  

  useEffect(() => {
    dispatch(removeCurrentRequestPage());
  }, []);

  return (
    <div>
      <div className="pl-5 md:pl-19 pt-5 pb-5">
        <div className="sticky top-20 mb-30 z-10">
          <div className="flex">
            <button
              onClick={() => dispatch(setCurrentRequestPage("pending"))}
              className={`${
                currentRequestPage === "pending"
                  ? "bg-primary text-white"
                  : "bg-gray-600 text-white"
              } rounded-none font-semibold text-lg py-2 px-4 flex items-center space-x-2`}
            >
              <PendingIcon />
              <span className="hidden md:block">{t("status.pending")}</span>
            </button>
            <button
              onClick={() => dispatch(setCurrentRequestPage("accepted"))}
              className={`${
                currentRequestPage === "accepted"
                  ? "bg-primary text-white"
                  : "bg-gray-600 text-white"
              } rounded-none font-semibold text-lg py-2 px-4 flex items-center space-x-2`}
            >
              <ThumbUpAltIcon />
              <span className="hidden md:block">{t("status.accepted")}</span>
            </button>
            <button
              onClick={() => dispatch(setCurrentRequestPage("declined"))}
              className={`${
                currentRequestPage === "declined"
                  ? "bg-primary text-white"
                  : "bg-gray-600 text-white"
              } rounded-none font-semibold text-lg py-2 px-4 flex items-center space-x-2`}
            >
              <ThumbDownAltIcon />
              <span className="hidden md:block">{t("status.declined")}</span>
            </button>
          </div>
        </div>
        <div>
          {currentRequestPage === "pending" ? (
            <LandlordRequestPending />
          ) : currentRequestPage === "accepted" ? (
            <LandlordRequestAccepted />
          ) : (
            <LandlordRequestDeclined />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllLandlordRequest;
