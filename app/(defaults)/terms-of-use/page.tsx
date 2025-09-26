"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "styles/home.css";

const HomePage = () => {
  const [pageContent, setPageContent] = useState("");
  const [termsContent, setTermsContent] = useState("");

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const res = await fetch("/api/page");
        const json = await res.json();
        if (json.success && json.data?.termsConditions) {
          setTermsContent(json.data.termsConditions);
        } else {
          console.error("Terms & Conditions not found in API response");
        }
      } catch (error) {
        console.error("Failed to fetch page content", error);
      }
    };
  
    fetchPageContent();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="main_header">
        <div className="custom-container-fluid">
          <div className="main_top_bar">
            <h1>
              <Link href="/">
                <img src="/assets/images/top-logo.png" alt="Top Logo" />
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div className="sab-banner-wraper">
        <div className="container">
          <div className="sab-banner-text">
            <h2>Terms &amp; Conditions</h2>
          </div>
        </div>
        {/* SVG divider remains the same */}
      </div>

      <section className="pet_experience_wrap">
        <div className="container">
          <div className="pet_team_experience_row">
          <div
  className="pet_experience_text"
  dangerouslySetInnerHTML={{ __html: termsContent }}
/>

          </div>
        </div>
      </section>

      <div className="footer pet_widget">
        <div className="custom-container">
          <div className="main_widget_row">
            <div className="pet_widget_column">
              <figure>
                <img src="/assets/images/top-logo.png" alt="Footer Logo" />
              </figure>
              <footer style={footerStyle}>
                <div style={linkContainerStyle}>
                  <Link href="/" style={linkStyle}>Home</Link>
                  <Link href="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
                  <Link href="/refund-policy" style={linkStyle}>Refund Policy</Link>
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
  );
};

export default HomePage;

const footerStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const linkContainerStyle = {
  display: "flex",
  gap: "15px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
