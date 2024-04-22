import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHouse, removeNewHouse } from "../features/house/houseSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { uploadImage } from "../features/upload/uploadSlice";
import { removeUploadImage, removeUploadError } from "../features/upload/uploadSlice";
import toast from "react-hot-toast";

const CreateHouse = () => {
  const dispatch = useDispatch();
  const { newHouse, isLoading, isError } = useSelector((state) => state.house);
  const { uploadImage, errorImage, loadingUploadingImage } = useSelector((state) => state.upload);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Non Selected");

  const productStatus = [
    { value: "available", label: "createproduct.available" },
    { value: "unavailable", label: "createproduct.unavailable" },
  ];

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
  useEffect(() => {
    dispatch(removeUploadImage());
  }, []);

  // const handleImageChange = (event) => {
  //   const images = Array.from(event.target.files);
  //   setHouse({
  //     ...house,
  //     images: [...house.images, ...images],
  //   });
  // };

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
        setImage("");
        toast.success("Request done successfully.");
      }, 60000); 
    }
  }, [newHouse, dispatch]);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setFileName(file?.name);
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
    const sendImage = formData.get("image");
    dispatch(uploadImage(sendImage));
  };

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
          {/* {loadingUploadingImage && (
          <div className="text-center">
            <ClipLoader color={"#36d7b7"} loading={loadingUploadingImage} size={50} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )}
         {errorImage && (
          <div className="bg-red-500 text-white text-lg py-2 px-4 rounded mb-4 text-center">Error While Uploading Image</div>
        )} */}

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
            onChange={handleImageUpload}
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
