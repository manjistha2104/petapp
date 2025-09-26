import Image from "next/image";
import Link from "next/link";
import "styles/home.css";
const HomePage = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* main header  start */}
        <div className="main_header">
          <div className="custom-container-fluid">
            {/* main top bar start */}
            <div className="main_top_bar">
              <h1>
                <Link href="/">
                  <img src="/assets/images/top-logo.png" />
                </Link>
              </h1>
            </div>
            {/* main top bar end*/}
          </div>
        </div>
        {/* main header end*/}
        {/*sab banner wraper start*/}
        <div className="sab-banner-wraper">
          <div className="container">
            <div className="sab-banner-text">
              <h2>Shipping & Delivery </h2>
            </div>
          </div>
          <div className="custom-shape-divider-bottom-1687358784">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              />
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              />
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>
        {/*sab banner wraper end*/}
        {/*pet experience warp start */}
        <section className="pet_experience_wrap">
          <div className="container">
            <div className="pet_team_experience_row">
              <div className="pet_experience_text">
                <h2> Shipping Policy </h2>
                <p>
                  <b>.</b> We ship to various locations within India.
                </p>
                <p><b>.</b> Orders are processed within 2 business days after payment confirmation.</p>
                <p>
                <b>.</b> Any applicable shipping fees will be calculated at checkout based on the selected shipping method and the destination.
                </p>
                <br></br>
                <br></br>
            


                <h2> Standard Delivery Time </h2>
                <p>
                <b>.</b> Domestic Shipping:Typically takes 7 to 10 business days from the date of dispatch.
                </p>
                
                <p>
                &nbsp;&nbsp;Please note that delivery times may vary during peak seasons or due to unforeseen circumstances. We appreciate your understanding and &nbsp;&nbsp;patience.
                </p>
                <br></br>
                <br></br>
                <img src="/assets/images/pet.jpeg" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/*pet experience warp end */}
        {/*pet widget start*/}
        <div className="footer pet_widget">
          <div className="custom-container">
            <div className="main_widget_row">
              <div className="pet_widget_column">
                <figure>
                  <img src="/assets/images/top-logo.png" alt="" />
                </figure>
                <footer style={footerStyle}>
                  <div style={linkContainerStyle}>
                    <Link href="/" style={linkStyle}>
                      Home
                    </Link>
                    <Link href="/privacy-policy" style={linkStyle}>
                      Privacy Policy
                    </Link>

                    <Link href="/terms-of-use" style={linkStyle}>
                      Terms of Use
                    </Link>
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
  gap: "20px", // Adds space between the links
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
