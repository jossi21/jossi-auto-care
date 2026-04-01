import React from "react";
import { Link } from "react-router";
import aboutBanner from "../../../assets/template_assets/Custom/about/about__banner.jpg";
import addressMap from "../../../assets/template_assets/Custom/other_images/address_image.png";

const Contact = () => {
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
          <h2>Contact</h2>
          <ul className="page-breadcrumb">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>Contact</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>

      {/* <!--Contact Section--> */}
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Drop us message</h2>
            <div className="text">
              Praising pain was born and I will give you a complete account of
              the system, and
            </div>
          </div>
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-map">
                  <img src={addressMap} alt="Location" />
                </div>
              </div>
            </div>

            {/* <!--Info Column--> */}
            <div className="info-column col-lg-5">
              <div className="inner-column">
                <h4>Our Address</h4>
                <div className="text">
                  Completely synergize resource taxing relationships via premier
                  niche markets. Professionally cultivate one-to-one customer
                  service.
                </div>
                <ul>
                  <li>
                    <i className="flaticon-pin"></i>
                    <span>Address:</span> Addis Ababa, Ethiopia, Arada Subcity ,
                    5kilo
                  </li>
                  <li>
                    <i className="flaticon-email"></i>
                    <span>email:</span> jossi9342@gmail.com
                  </li>
                  <li>
                    <i className="flaticon-phone"></i>
                    <span>phone:</span>
                    +251 92 555 3491
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--End Contact Section--> */}

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
                <Link to="#" className="theme-btn btn-style-one">
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

export default Contact;
