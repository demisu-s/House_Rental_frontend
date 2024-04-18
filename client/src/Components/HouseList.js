import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHouse } from "../features/house/houseSlice";
import HouseCard from "./HouseCard";

const HouseList = () => {
  const dispatch = useDispatch();
  const { allHouse, isLoading, isError } = useSelector(
    (state) => state.house
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure allHouse is an array before mapping over it
  const sortedHouse = Array.isArray(allHouse)
    ? allHouse
        .filter((house) =>
          house?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(3)
    : []; // If allHouse is not an array, initialize an empty array

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getHouse())
      .unwrap()
      .catch((error) => console.error("Error fetching houses: ", error));
  }, [dispatch]);

  return (
    <div className="px-5 py-5 md:px-18.5 pt-5 pb-5">
      <div>
        <div className="w-full md:w-3/4 mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center h-screen">
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedHouse?.map((house, index) => (
            <HouseCard key={index} {...house} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HouseList;
