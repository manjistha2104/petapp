"use client";

import React from "react";

const BannerComponent = ({
  banners,
  setBanners,
  saveBannerSettings,
  onDelete,
}) => {
  // Add new banner row
  const addNewBannerRow = () => {
    setBanners([...banners, { image: null, name: "", imageUrl: "" }]);
  };

  // Handle file changes for banners
  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedBanners = [...banners];
      updatedBanners[index].image = file; // Update banner file at index
      updatedBanners[index].imageUrl = URL.createObjectURL(file); // Temporarily show the image URL for preview
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

  // Remove the image and show the browse button again
  const removeImage = (index: number) => {
    const updatedBanners = [...banners];
    updatedBanners[index].image = null; // Remove image file
    updatedBanners[index].imageUrl = ""; // Clear the image URL
    setBanners(updatedBanners);
  };

  // Delete banner row
  const deleteBannerRow = (index: number) => {
    onDelete(index); // Call the parent component's delete handler
  };

  return (
    <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
      <h6 className="mb-5 text-lg font-bold">Banner</h6>
      {banners && banners.length > 0 ? (
        banners.map((banner, index) => (
          <div
            key={index}
            className="mb-4 flex items-center justify-between gap-4"
          >
            {/* Left section for Image and Banner Name */}
            <div className="flex items-center gap-4">
              {/* Banner Image */}
              <div className="flex items-center">
                <label htmlFor={`bannerImage-${index}`} className="mr-2">
                  Image:
                </label>
                {banner.imageUrl ? (
                  <div className="relative">
                    <img
                      src={`${banner.imageUrl}`}
                      alt={`banner-${index}`}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    id={`bannerImage-${index}`}
                    name="bannerImage"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e)}
                    className="form-input"
                  />
                )}
              </div>

              {/* Banner Name */}
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Banner Name:</label>
                <input
                  id={`bannerName-${index}`}
                  name="bannerName"
                  type="text"
                  className="form-input w-80"
                  value={banner.name}
                  onChange={(e) => handleBannerNameChange(index, e)}
                />
              </div>
            </div>

            {/* Right section for Delete Button */}
            <div>
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
  );
};

export default BannerComponent;
