import axios from "axios";

const uploadService = {
  uploadImage: async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeUploadImage: async (id) => {
    try {
      const formData = new FormData();
      formData.delete("image", id);
      const response = await axios.delete("/upload", {
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default uploadService;
