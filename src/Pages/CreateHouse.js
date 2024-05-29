import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';

const CreateHouse = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      // Replace with your API call
      // await apiCallToSubmitHouse(formDataToSubmit);
      console.log('Form submitted', formDataToSubmit);

      // Clear form after submission
      setFormData({
        title: '',
        location: '',
        price: '',
        description: '',
        image: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form', error);
      // handle error accordingly
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New House</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.title && <small className="text-red-500">{errors.title}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.location && <small className="text-red-500">{errors.location}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.price && <small className="text-red-500">{errors.price}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.description && <small className="text-red-500">{errors.description}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              multiple={true}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.image && <small className="text-red-500">{errors.image}</small>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHouse;
