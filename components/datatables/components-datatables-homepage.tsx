"use client";

import React, { useState, useEffect } from "react";

const ComponentsDatatablesHomepage = () => {
  const [editid, setEditid] = useState<string>(""); // Edit id for the homepage
  const [popupVisible, setPopupVisible] = useState<boolean>(false); // For showing the popup
  const [banners, setBanners] = useState([{ image: null, name: "" }]); // Array of banners with image and name
  const [categories, setCategories] = useState([{ image: null, text: "" }]); // Array of categories with image and text
  const [services, setServices] = useState([{ image: null, name: "" }]); // Array of services with image and name

  useEffect(() => {
    // Fetch homepage data on component mount
    fetch("/api/homepage")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set the edit id and fetched data
        setEditid(data._id);
        setBanners(data.banners || [{ image: null, name: "" }]);
        setCategories(data.categories || [{ image: null, text: "" }]);
        setServices(data.services || [{ image: null, name: "" }]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // Upload multiple images using a FormData object
  const uploadImages = async (
    url: string,
    images: { image: File | null; name: string }[]
  ) => {
    const formData = new FormData();
    images.forEach((item) => {
      if (item.image && item.name) {
        formData.append("image", item.image); // Append each image
        formData.append("name", item.name); // Append each banner name
      }
    });

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to upload images: ${res.status}`);
    }

    return res.json();
  };

  // Save banner settings
  const saveBannerSettings = async () => {
    const formData = new FormData();

    banners.forEach((banner, index) => {
      if (banner.image && banner.name) {
        formData.append(`image`, banner.image); // Append the image
        formData.append(`name`, banner.name); // Append the banner name
      }
    });

    // Debugging - log formData entries to check if all banners are appended correctly
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error saving banners:", error);
    }
  };

  // Save category settings
  const saveCategorySettings = async () => {
    try {
      const uploadedCategoryImages = await Promise.all(
        categories.map(async (category) => {
          if (category.image) {
            const res = await uploadImages("/api/categoryupload", [category]);
            return { ...category, image: res.url }; // Save the image URL returned
          }
          return category;
        })
      );

      const categoryData = { categories: uploadedCategoryImages };
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Category settings saved!", data);

      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
    } catch (error) {
      console.error(
        "There was a problem with the category save operation:",
        error
      );
    }
  };

  // Save service settings
  const saveServiceSettings = async () => {
    try {
      const uploadedServiceImages = await Promise.all(
        services.map(async (service) => {
          if (service.image) {
            const res = await uploadImages("/api/servicesupload", [service]);
            return { ...service, image: res.url }; // Save the image URL returned
          }
          return service;
        })
      );

      const serviceData = { services: uploadedServiceImages };
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Service settings saved!", data);

      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
    } catch (error) {
      console.error(
        "There was a problem with the service save operation:",
        error
      );
    }
  };

  // Add new banner row
  const addNewBannerRow = () => {
    setBanners([...banners, { image: null, name: "" }]);
  };

  // Handle file changes for banners, categories, or services
  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedBanners = [...banners];
      updatedBanners[index].image = file; // Update banner file at index
      setBanners(updatedBanners);
    }
  };

  // Handle banner name changes
  const handleBannerNameChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedBanners = [...banners];
    updatedBanners[index].name = value; // Update banner name
    setBanners(updatedBanners);
  };

  // Handle category name changes
  const handleCategoryTextChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedCategories = [...categories];
    updatedCategories[index].text = value;
    setCategories(updatedCategories);
  };

  // Handle service name changes
  const handleServiceNameChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedServices = [...services];
    updatedServices[index].name = value; // Update service name
    setServices(updatedServices);
  };

  // Delete banner row
  // Delete banner row
  const deleteBannerRow = (index: number) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  // Add new category row
  const addNewCategoryRow = () => {
    setCategories([...categories, { image: null, text: "" }]);
  };

  // Delete category row
  const deleteCategoryRow = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  // Add new service row
  const addNewServiceRow = () => {
    setServices([...services, { image: null, name: "" }]);
  };

  // Delete service row
  const deleteServiceRow = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div className="pt-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Homepage
        </h5>
      </div>

      {/* Banner Section */}
      <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Banner</h6>
        {banners && banners.length > 0 ? (
          banners.map((banner, index) => (
            <div
              key={index}
              className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2"
            >
              <div>
                <label htmlFor={`bannerImage-${index}`}>Banner Image</label>
                <input
                  type="file"
                  id={`bannerImage-${index}`}
                  name="bannerImage"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e, true)}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor={`bannerName-${index}`}>Banner Name</label>
                <input
                  id={`bannerName-${index}`}
                  name="bannerName"
                  type="text"
                  className="form-input"
                  value={banner.name}
                  onChange={(e) => handleBannerNameChange(index, e)}
                />
              </div>

              <div className="flex justify-end sm:col-span-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteBannerRow(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No banner image available</p>
        )}
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewBannerRow}
          >
            Add New Row
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={saveBannerSettings}
          >
            Save Banners
          </button>
        </div>
      </form>

      {/* Categories Section */}
      <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Categories</h6>
        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2"
            >
              <div>
                <label htmlFor={`categoryImage-${index}`}>Category Image</label>
                <input
                  type="file"
                  id={`categoryImage-${index}`}
                  name="categoryImage"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e, false)}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor={`categoryText-${index}`}>Category Name</label>
                <input
                  id={`categoryText-${index}`}
                  name="categoryText"
                  type="text"
                  className="form-input"
                  value={category.text}
                  onChange={(e) => handleCategoryTextChange(index, e)}
                />
              </div>

              <div className="flex justify-end sm:col-span-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteCategoryRow(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewCategoryRow}
          >
            Add New Row
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={saveCategorySettings}
          >
            Save Categories
          </button>
        </div>
      </form>

      {/* Services Section */}
      <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Services</h6>
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2"
            >
              <div>
                <label htmlFor={`serviceImage-${index}`}>Service Image</label>
                <input
                  type="file"
                  id={`serviceImage-${index}`}
                  name="serviceImage"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e, false, true)}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor={`serviceName-${index}`}>Service Name</label>
                <input
                  id={`serviceName-${index}`}
                  name="serviceName"
                  type="text"
                  className="form-input"
                  value={service.name}
                  onChange={(e) => handleServiceNameChange(index, e)}
                />
              </div>

              <div className="flex justify-end sm:col-span-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteServiceRow(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewServiceRow}
          >
            Add New Row
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={saveServiceSettings}
          >
            Save Services
          </button>
        </div>
      </form>

      {/* Popup notification for data update */}
      {popupVisible && (
        <div className="fixed bottom-5 right-5 flex items-center justify-between rounded bg-gray-800 p-3 text-white shadow-lg">
          <span>Data updated successfully</span>
          <button
            onClick={() => setPopupVisible(false)}
            className="bg-transparent text-white"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentsDatatablesHomepage;
