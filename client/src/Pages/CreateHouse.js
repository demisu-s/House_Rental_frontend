import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHouse, removeNewHouse } from "../features/house/houseSlice";
import ClipLoader from "react-spinners/ClipLoader";

const CreateHouse = () => {
  const dispatch = useDispatch();
  const { newHouse, isLoading, isError } = useSelector((state) => state.house);

  const [house, setHouse] = useState({
    title: "",
    description: "",
    address: "",
    square_feet: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    images: [], // State for multiple images
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setHouse({
      ...house,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const images = Array.from(event.target.files);
    setHouse({
      ...house,
      images: [...house.images, ...images],
    });
  };

  useEffect(() => {
    if (newHouse) {
      setTimeout(() => {
        dispatch(removeNewHouse());
        setHouse({
          title: "",
          description: "",
          address: "",
          square_feet: "",
          bedrooms: "",
          bathrooms: "",
          price: "",
          images: [],
        });
      }, 60000); // Adjust timeout value as needed
    }
  }, [newHouse, dispatch]);

  const handleCreateHouse = () => {
    setButtonClicked(true);
    dispatch(createHouse(house));
  };

  return (
    <div className="px-5 py-5 md:px-20">
      <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
        <div className="bg-white shadow-md p-4 md:p-5">
          <h1 className="text-2xl text-center mb-4 font-semibold text-primary">
            Create House
          </h1>

          {isLoading && (
            <div className="text-center mb-4">
              <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
            </div>
          )}

          {isError && (
            <div className="bg-red-500 text-white text-center py-2 px-4 mb-4">
              Error While Creating House
            </div>
          )}

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={house.title}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={house.description}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={house.address}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Square Feet"
            name="square_feet"
            value={house.square_feet}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Bedrooms"
            name="bedrooms"
            value={house.bedrooms}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Bathrooms"
            name="bathrooms"
            value={house.bathrooms}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={house.price}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          
          <input
            type="file"
            multiple // Allow selecting multiple files
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          
          <button
  className="bg-gray-400 hover:bg-gray-600 text-black font-semibold py-2 px-4 rounded-full mt-4 w-full"
  onClick={handleCreateHouse}
>
  Create
</button>

        </div>
      </div>
    </div>
  );
};

export default CreateHouse;