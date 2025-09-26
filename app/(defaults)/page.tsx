import Image from "next/image";
import Link from "next/link";
import "styles/home.css";
const HomePage = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Home page Pet</title>
      <link href="style.css" rel="stylesheet" />
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
        {/* main banner start */}
        <div className="main_banner top_banner">
          <div className="bg_layer">
            <div className="custom-container-fluid">
              <div className="main_banner_row">
                <div className="mian_banner_text">
                  <h2>Your Pet</h2>
                  <h1>Our Priority</h1>
                  <p>
                  
                   We are fully committed to the health.
                  </p>
                  <ul className="banner_video">
                    <a className="main_button btn2" href="#">
                      <img src="/assets/images/playstore.png" alt="" />
                    </a>{" "}
                    <a className="play_btn" href="#">
                      <img src="/assets/images/appstore.png" alt="" />
                    </a>
                  </ul>
                </div>
                <div className="banner_fig_slider">
                  <div>
                    <div className="mian_banner_fig">
                      <figure>
                        {" "}
                        <img src="/assets/images/banner-fig01.png" />{" "}
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="divider_id" className="website-divider-container-500113">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="divider-img-500113"
                viewBox="0 0 1080 137"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,137 V 59.03716 c 158.97703,52.21241 257.17659,0.48065 375.35967,2.17167 118.18308,1.69101 168.54911,29.1665 243.12679,30.10771 C 693.06415,92.25775 855.93515,29.278599 1080,73.61449 V 137 Z"
                  style={{ opacity: "0.85" }}
                />
              </svg>
            </div>
          </div>
        </div>
        {/* main banner end*/}
        {/* pet about wrap start */}
        <section className="pet_about_wrap">
          <div className="custom-container">
            <div className="pet_about_row">
              <div className="pet_about_fig">
                <figure>
                  {" "}
                  <img src="/assets/images/about-fig.png" alt="image" />{" "}
                </figure>
              </div>
              <div className="pet_about_text">
                <h3>About Us</h3>
                <h2>
                  We'll Make Your Pets
                  <br />
                  Really Awesome
                </h2>
                <p>
                  Pawscare is the largest specialty pet retailer of services and
                  solutions for the lifetime needs of pets. At Pawscare, we love
                  pets, and we believe pets make us better people.
                </p>
                <a className="main_button btn2 bdr-clr hover-affect" href="#">
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </section>
        {/* pet about wrap end */}
        {/* pet service02 warp start */}
        <section className="pet_sevice02_wrap">
          <div className="custom-container">
            <div className="mian_heading">
              <h2 className="clr_white">Our Services</h2>
              <h3 className="clr_white">We are best in</h3>
            </div>
            <div className="pet_service02_row">
              <div className="pet_service02_column">
                <figure>
                  {" "}
                  <img src="/assets/images/service-fig.png" alt="" />{" "}
                </figure>
                <h5>Clinical Services</h5>
                <p>
                  <strong>Cause for Paws:</strong> Complete Clinical Services
                  for Your Pets' Optimal Health
                </p>
                <p>
                  Discover the ultimate companion for your pet’s well-being with{" "}
                  <strong>Cause for Paws!</strong> Whether it’s treating an
                  unexpected illness or managing chronic health conditions
                </p>
                <a className="main_button btn2 hover-affect" href="#">
                  Learn More
                </a>{" "}
              </div>
              <div className="pet_service02_column">
                <figure>
                  {" "}
                  <img src="/assets/images/service-fig01.png" alt="" />{" "}
                </figure>
                <h5>Preventive Services</h5>
                <p>
                  <strong>
                    Cause for Paws: Prevent Disease Before It Starts
                  </strong>
                </p>
                <p>
                  Prevention is the key to a healthy pet, and{" "}
                  <strong>Cause for Paws</strong> makes it easy to keep your
                  furry friend safe from diseases before they even start.From
                  personalized vaccination reminders
                </p>
                <a className="main_button btn2 hover-affect" href="#">
                  Learn More
                </a>{" "}
              </div>
              <div className="pet_service02_column">
                <figure>
                  {" "}
                  <img src="/assets/images/service-fig02.png" alt="" />{" "}
                </figure>
                <h5>Drugs and Vaccines</h5>
                <p>
                  <strong>
                    Safe Medications &amp; Vaccines, Right at Your Fingertips
                  </strong>
                </p>
                <p>
                  With <strong>Cause for Paws,</strong> managing your pet's
                  health has never been easier. Our app connects you to
                  veterinary-approved drugs and vaccines.{" "}
                </p>
                <a className="main_button btn2 hover-affect" href="#">
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
          <div className="custom-shape-divider-top-1687264903">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </section>
        {/* pet service warp end */}
        {/* pet counter wrap start */}
        <section className="pet_counter_wrap">
          <div className="pet_counter_bg">
            <div className="custom-container">
              <div className="pet_counter_row">
                <div className="pet_counter_column">
                  {" "}
                  <span>
                    <i className="fa fa-user-md" />
                  </span>
                  <div className="pet_counter_text">
                    <h3 className="counter">550</h3>
                    <p>Happy Clients</p>
                  </div>
                </div>
                <div className="pet_counter_column">
                  {" "}
                  <span>
                    <i className="fa fa-user-md" />
                  </span>
                  <div className="pet_counter_text">
                    <h3 className="counter">80</h3>
                    <p>Professional</p>
                  </div>
                </div>
                <div className="pet_counter_column">
                  {" "}
                  <span>
                    <i className="fa fa-paw" />
                  </span>
                  <div className="pet_counter_text">
                    <h3 className="counter">820</h3>
                    <p>EVENT DONE</p>
                  </div>
                </div>
                <div className="pet_counter_column">
                  {" "}
                  <span>
                    <i className="fa fa-medkit" />
                  </span>
                  <div className="pet_counter_text">
                    <h3 className="counter">820</h3>
                    <p>Pets Products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-shape-divider-bottom-1687266093">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="shape-fill"
                />
              </svg>
            </div>
          </div>
        </section>
        {/* pet client wrap end*/}
        {/* pet exercise warp start */}
        <section className="pet_exercise_wrap">
          <div className="custom-container">
            <div className="pet_exercise_row">
              <div className="pet_exercise_fig">
                <figure>
                  {" "}
                  <img src="/assets/images/exercise-fig.png" alt="" />{" "}
                </figure>
              </div>
              <div className="pet_exercise_text">
                <h3>Our Features</h3>
                <p>
                  Here's a feature list for a pet care app based on the provided
                  features:
                </p>
                <ul className="pet_service_list">
                  <li>
                    <figure>
                      {" "}
                      <img
                        src="/assets/images/exercise-list-fig.png"
                        alt=""
                      />{" "}
                      <span>01</span>{" "}
                    </figure>
                    <div className="pet_exercise_list_text">
                      <h5>Doorstep Pet Care Services</h5>
                      <p>
                        <strong>Doorstep Veterinary Services:</strong> Routine
                        health checkups, vaccinations, and specialized care
                        provided at home.
                      </p>
                    </div>
                  </li>
                 
                 
                  <li>
                    <figure>
                      {" "}
                    </figure>
                    <div className="pet_exercise_list_text">
                     
                      <p>
                        Pet consultation - Starting from INR.500 - INR.1,500/-
                      </p>
                    </div>
                  </li>
                  <li>
                    {" "}
                   
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* pet exercise warp end */}
        {/*pet price table wraper start*/}
        <section className="pet_price_table_wrap">
          <div className="custom-container">
            <div className="mian_heading text-center">
              <h2>Choose Your</h2>
              <h3>Why Choose Our Pet Care Company</h3>
            </div>
            <div className="pet_accordian_row">
              <div className="pet_accordian_fig">
                <figure>
                  {" "}
                  <img
                    src="/assets/images/accordiance-fig.png"
                    alt="image"
                  />{" "}
                </figure>
              </div>
              <div className="pet_accordion_column">
                <div className="pet_info">
                 
                 

                  <div className="btn-group">
                    <div className="btn-group-sec">
                      {" "}
                      <a href="#">
                        <img src="/assets/images/appstore.png" alt="appstore" />
                      </a>{" "}
                      <a className="play_store" href="#">
                        <img
                          src="/assets/images/playstore.png"
                          alt="playsotre"
                        />
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="main-wrapper">
       
       
        {/*pet experience warp end */}
        {/*pet widget start*/}
       
      </div>
        {/*pet price table wraper end*/}
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
                    <Link href="/privacy-policy" style={linkStyle}>
                      Privacy Policy
                    </Link>
                    <Link href="/terms-of-use" style={linkStyle}>
                      Terms of Use
                    </Link>
                    <Link href="/refund-policy" style={linkStyle}>
                      Refund Policy
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
