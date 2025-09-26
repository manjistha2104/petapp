"use client";

import React, { useState, useEffect } from "react";
import HomeservicesComponent from "../components/HomeservicesComponent"; // Adjust the path if needed

const BannerPage = () => {
  const [banners, setBanners] = useState([]); // Initialize as empty array to avoid SSR hydration mismatch
  const [loading, setLoading] = useState(true); // Add loading state
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // Fetch banner data on page load
    fetch("/api/homeservice")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const loadedBanners =
          data.banners?.[0]?.banners.map((banner) => ({
            name: banner.name,
            imageUrl: banner.imageUrl, // Image URL for pre-population
            image: null, // Image object remains null unless user uploads a new one
          })) || [];

        setBanners(loadedBanners);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch is done
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

      const response = await fetch("/api/homeservice", {
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
        Services Settings
      </h5>
      <HomeservicesComponent
        banners={banners}
        setBanners={setBanners}
        saveBannerSettings={saveBannerSettings}
        onDelete={handleDelete} // Pass the onDelete handler here
      />

      {popupVisible && (
        <div className="fixed bottom-5 right-5 flex items-center justify-between rounded bg-gray-800 p-3 text-white shadow-lg">
          <span>Services settings saved successfully!</span>
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
