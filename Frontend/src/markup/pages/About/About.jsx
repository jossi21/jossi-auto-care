import React from "react";
import { Link } from "react-router";
import aboutBanner from "../../../assets/template_assets/Custom/about/about__banner.jpg";
import ourMechanics from "../../../assets/template_assets/Custom/about/About_our_mechanics.jpg";
import introVideo from "../../../assets/template_assets/Custom/video_intro_image/video_intro_image.jpg";
import oilImage from "../../../assets/template_assets/Custom/other_images/oil.png";
import gearsImage from "../../../assets/template_assets/Custom/other_images/gears.jpg";
import additionalService from "../../../assets/template_assets/Custom/other_images/Additional_Service image.jpg";

const About = () => {
  return (
    <>
      {/* <!-- Page Title --> */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="auto-container">
          <h2>About us</h2>
          <ul className="page-breadcrumb">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>About us</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      {/* <!-- About Section Three --> */}
      <section className="about-section-three">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-7">
              <div className="content">
                <h2>
                  We are highly skilled mechanics <br />
                  for your car repair
                </h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    Link new normal that has evolved from generation X is on the
                    runway heading towards Link streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify Link ballpark
                    value added activity to beta test. Override the digital
                    divide with additional clickthroughs from DevOps.
                    Nanotechnology immersion along the information heading
                    towards Link streamlined cloud solution. User generated
                    content in real-time will have multiple.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="image">
                <img src={ourMechanics} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Us --> */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box">
                <img src={oilImage} alt="oil splash" />
                <img src={gearsImage} alt="gears" />
                <div className="year-experience" data-parallax='{"y": 30}'>
                  <strong>7</strong> years <br />
                  Experience
                </div>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our Home</h5>
                <h2>We have 7 years experience</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    Link new normal that has evolved from generation X is on the
                    runway heading towards Link streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify Link ballpark
                    value added activity to beta test. Override the digital
                    divide with additional clickthroughs from DevOps.
                    Nanotechnology immersion along the information highway will
                    close the loop on focusing.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <Link
                    to="/about"
                    className="theme-btn btn-style-one style-two"
                  >
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Why Choose Us --> */}
      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Why Choose Us</h2>
                <div className="text">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward,
                  Link new normal that has evolved from generation heading
                  towards.
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>
                <h4>Fast And Quality Service</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>
                <h4>Best Prices in Town</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>
                <h4>Awarded Workshop</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Addtional Services</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image">
                    <img src={additionalService} alt="Additional Service" />
                  </div>
                </div>
                <div className="col-md-7">
                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Break Job / Break Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagaonstic Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Video Section --> */}
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${introVideo})`,
          }}
        ></div>
        <div className="auto-container">
          <h5>Working since 2018</h5>
          <h2>
            We are leader <br />
            in Car Mechanical Work
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <Link
                to="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </Link>
            </div>
            <div className="text">
              Watch intro video <br />
              about us
            </div>
          </div>
        </div>
      </section>

      {/* <!-- CTA Section --> */}
      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">1800.456.7890</div>
              <div className="btn">
                <Link to="/contact" className="theme-btn btn-style-one">
                  <span>Appointment</span>
                  <i className="flaticon-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
