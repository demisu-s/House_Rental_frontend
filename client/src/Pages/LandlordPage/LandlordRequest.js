import React from "react";
import AllLandlordRequest from "../components/Landlord/AllLandlordRequest";
import Header from "../components/Header";

const LandlordRequest = () => {
  return (
    <>
      <Header />
      <div className="h-30"></div>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-0 md:px-8 pb-32 pt-32">
          <AllLandlordRequest />
        </div>
      </div>
    </>
  );
};

export default LandlordRequest;
