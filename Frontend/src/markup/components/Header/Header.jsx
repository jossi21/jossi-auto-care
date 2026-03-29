import React from "react";
// import the loge image
import logo from "../../../assets/template_assets/Custom/logo1.png";
import { Link } from "react-router-dom";
// import icon bar
import iconBar from "../../../assets/template_assets/images/icons/icon-bar.png";
import { useAuthContext } from "../../../context/AuthContext";
import loginService from "../../../services/login.service";
import getToken from "../../../utils/Auth";

const Header = () => {
  // console.log(useAuthContext());
  const { isLogged, setIsLogged, employee } = useAuthContext();
  // console.log(auth);
  // console.log("Is logged:", isLogged);
  // console.log("Employee:", employee);
  // declare the function  that handle the logout process
  const Logout = () => {
    loginService.logOut();

    setIsLogged(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className="main-header header-style-one">
        {/* Header Top  */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Stay with us</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              {isLogged ? (
                <div className="right-column">
                  <div className="phone-number px-5">
                    <strong>Welcome {employee?.employee_first_name}</strong>
                  </div>
                </div>
              ) : (
                <div className="right-column">
                  <div className="phone-number">
                    Schedule Today :<strong>1800 456 7890</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Header Upper --> */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              {/* <!--Logo--> */}
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="right-column">
                {/* Nav Box--> */}
                <div className="nav-outer">
                  {/* Mobile Navigation Toggler--> */}
                  <div className="mobile-nav-toggler">
                    <img src={iconBar} alt="" />
                  </div>

                  {/* Main Menu --> */}
                  <nav className="main-menu navbar-expand-md navbar-light pr-5">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation">
                        <li className="dropdown">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="dropdown">
                          <Link to="/about">About Us</Link>
                        </li>
                        <li className="dropdown">
                          <Link to="/service">Services</Link>
                        </li>

                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>

                {isLogged ? (
                  <div className="link-btn">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one"
                      onClick={Logout}
                    >
                      Logout{" "}
                    </Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login{" "}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End Header Upper--> */}

        {/* Sticky Header  --> */}
        <div className="sticky-header">
          {/* Header Upper --> */}
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                {/* <!--Logo--> */}
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  {/* <!--Nav Box--> */}
                  <div className="nav-outer">
                    {/* <!--Mobile Navigation Toggler--> */}
                    <div className="mobile-nav-toggler">
                      <img src={iconBar} alt="" />
                    </div>

                    {/* <!-- Main Menu --> */}
                    <nav className="main-menu navbar-expand-md navbar-light"></nav>
                  </div>
                  {isLogged ? (
                    <div className="link-btn">
                      <Link
                        to="/"
                        className="theme-btn btn-style-one"
                        onClick={Logout}
                      >
                        Logout{" "}
                      </Link>
                    </div>
                  ) : (
                    <div className="link-btn">
                      <Link to="/login" className="theme-btn btn-style-one">
                        Login{" "}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <!--End Header Upper--> */}
        </div>
        {/* <!-- End Sticky Menu --> */}

        {/* <!-- Mobile Menu  --> */}
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
                <img src={logo} alt="" title="" />
              </Link>
            </div>
            <div className="menu-outer">
              {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
            </div>
          </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
      {/* <!-- End Main Header --> */}
      {/*  */}
    </>
  );
};

export default Header;
