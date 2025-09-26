"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "styles/home.css";

const HomePage = () => {
  const [privacyContent, setPrivacyContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch("/api/page");
        const result = await response.json();
        if (result.success && result.data?.privacyPolicy) {
          setPrivacyContent(result.data.privacyPolicy);
        }
      } catch (error) {
        console.error("Failed to fetch privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        {/* main header */}
        <div className="main_header">
          <div className="custom-container-fluid">
            <div className="main_top_bar">
              <h1>
                <Link href="/">
                  <img src="/assets/images/top-logo.png" alt="Logo" />
                </Link>
              </h1>
            </div>
          </div>
        </div>

        {/* banner */}
        <div className="sab-banner-wraper">
          <div className="container">
            <div className="sab-banner-text">
              <h2>Privacy Policy</h2>
            </div>
          </div>
          {/* ...shape SVG code remains the same */}
        </div>

        {/* privacy policy section */}
        <section className="pet_experience_wrap">
          <div className="container">
            <div className="pet_team_experience_row">
              <div className="pet_experience_text">
                <h2>Privacy Policy</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: privacyContent }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <div className="footer pet_widget">
          <div className="custom-container">
            <div className="main_widget_row">
              <div className="pet_widget_column">
                <figure>
                  <img src="/assets/images/top-logo.png" alt="Logo" />
                </figure>
                <footer style={footerStyle}>
                  <div style={linkContainerStyle}>
                    <Link href="/" style={linkStyle}>Home</Link>
                    <Link href="/refund-policy" style={linkStyle}>Refund Policy</Link>
                    <Link href="/terms-of-use" style={linkStyle}>Terms of Use</Link>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          <div className="pet_copyright">
            <div className="container">
              <div className="pet_copyright_text">
                <p>@ 2024 All Rights Reserved and Registered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

// Styles
const footerStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const linkContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
