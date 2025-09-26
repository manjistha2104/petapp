"use client";

import React, { useState, useEffect } from "react";
import BannerComponent from "../components/BannerComponent"; // Adjust the path if needed

const BannerPage = () => {
  const [banners, setBanners] = useState([]); // Initialize as empty array to avoid SSR hydration mismatch
  const [loading, setLoading] = useState(true); // Add loading state
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setLoading(true); // Ensure loading starts
  
    fetch("/api/banner")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Banner Data:", data); // Check API response
  
        const loadedBanners = data.banners?.[0]?.banners.map((banner) => ({
          name: banner.name || "No Name",
          imageUrl: banner.imageUrl || "", // Ensure this exists
          image: null,
        })) || [];
  
        console.log("Processed Banners:", loadedBanners); // Check processed data
        setBanners(loadedBanners);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      })
      .finally(() => setLoading(false)); // Ensure loading stops
  }, []);
  
  const handleDelete = (index) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners); // Update the banners state to remove the banner
  };
  const saveBannerSettings = async () => {
    try {
      const formData = new FormData();

      banners.forEach((banner) => {
        if (banner.name) {
          formData.append("name", banner.name);
          if (banner.image) {
            formData.append("image", banner.image); // New image
          } else if (banner.imageUrl) {
            formData.append("imageUrl", banner.imageUrl); // Existing image URL
          }
        }
      });

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

  if (loading) {
    return <p>Loading...</p>; // Loading indicator while data is being fetched
  }

  return (
    <div className="pt-5">
      <h5 className="text-lg font-semibold dark:text-white-light">
        Banner Settings
      </h5>
      <BannerComponent
        banners={banners}
        setBanners={setBanners}
        saveBannerSettings={saveBannerSettings}
        onDelete={handleDelete} // Pass the onDelete handler here
      />

      {popupVisible && (
        <div className="fixed bottom-5 right-5 flex items-center justify-between rounded bg-gray-800 p-3 text-white shadow-lg">
          <span>Banner settings saved successfully!</span>
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

export default BannerPage;
