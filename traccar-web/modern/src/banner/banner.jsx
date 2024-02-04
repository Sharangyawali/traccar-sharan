import React from "react";
import { FaBars } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "../css/banner.css";
import LogoImage from "./gotoapp.png";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import TrackingImage from "./tracking.png";
import GeofencingImage from "./geofencing.png";
import { TbReport } from "react-icons/tb";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { TbGps } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { GiAmbulance } from "react-icons/gi";
import { FaEnvelope } from "react-icons/fa";
import { GiHelicopter } from "react-icons/gi";
import { MdElectricRickshaw } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaArrowRightToCity } from "react-icons/fa6";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div id="banner-container-special">
      <header>
        <a href="#" className="logo">
          <img src={LogoImage} alt="logo" />
        </a>
        <input type="checkbox" id="check"></input>
        <label htmlFor="check">
          <FaBars id="menu" size={24} color="rgb(24, 2, 63)" />
        </label>
        <nav className="navbar">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a onClick={() => navigate("/login")}>
                <FaRegUser size={24} />
                <div className="login_signup">
                  Login/
                  <br />
                  Signup
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {/* Home section starts */}
      <section className="home" id="home">
        <div id="particles-js"></div>
        <div className="content">
          <h2>
            Tracking Nepal
            <br /> Get Started With <span>GoToApp</span>
          </h2>
          <p>
            {" "}
            <span>Effortless</span> tracking is at your fingertips with GoToApp.{" "}
            <span>Seamlessly</span> monitor and stay connected with our
            intuitive location tracking functionality.
          </p>
          <a onClick={() => navigate("/login")} className="btn">
            <span>Start With Us</span>
            <i className="fas fa-arrow-circle-down"></i>
          </a>
        </div>
      </section>
      {/* Home section ends */}
      {/* Services section starts */}
      <section className="services" id="services">
        <div className="title">
          <h3>
            OUR <span>SERVICES</span>
          </h3>
          <p>Few services of our product</p>
        </div>

        <div className="operations">
          <div className="service-col">
            <img src={TrackingImage} />
            <h3>Tracking</h3>
            <p>
              Display real-time location updates for tracked devices on a
              map.Provide a live stream of device movements
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <FaCity size={45} />
            </div>
            <h3>City Transportation</h3>
            <p>
            Simplify city-to-city travel with our service—easy ticket booking, real-time vehicle tracking, and reliable schedules for stress-free journeys.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <MdOutlineEmojiTransportation size={45} />
            </div>
            <h3>Transport</h3>
            <p>
            Elevate your travel experience with our comprehensive transport service, offering easy booking, real-time tracking, and efficient schedules for a smooth and reliable journey.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <MdDeliveryDining size={45} />
            </div>
            <h3>Delivery</h3>
            <p>
            Optimize your logistics with our delivery service, providing efficient and trackable transport for various goods, ensuring timely and secure deliveries.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <GiAmbulance size={45} />
            </div>
            <h3>Ambulance</h3>
            <p>
            Prioritize health emergencies with quick GPS dispatch, onboard medical professionals, and real-time patient tracking.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <MdOutlineEmojiTransportation size={45} />
            </div>
            <h3>Ride Sharing</h3>
            <p>
            Effortlessly book rides, track drivers, and enjoy secure transactions in our streamlined ride-sharing service.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <FaEnvelope size={45} />
            </div>
            <h3>Courier</h3>
            <p>
            Streamline your deliveries with our courier service, offering reliable and trackable shipping solutions for timely and secure transportation of packages.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <GiHelicopter size={45} />
            </div>
            <h3>Heli Service</h3>
            <p>
            Soar to new heights with our helicopter service, delivering swift and scenic transportation solutions for an unparalleled aerial experience.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <MdElectricRickshaw size={45} />
            </div>
            <h3>Auto Rikshaw</h3>
            <p>
            Navigate through city streets effortlessly with our auto-rickshaw service, providing convenient and efficient point-to-point transportation for urban commuters.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <RiMotorbikeFill size={45} />
            </div>
            <h3>Self Drive</h3>
            <p>
            Take control of your journey with our self-drive service, offering the freedom to explore at your pace with convenient and secure rental options.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
          <div className="image">
          <FaArrowRightToCity size={45} />
            </div>
            <h3>Inter City</h3>
            <p>
            Navigate city limits seamlessly with our inner-city transport service, ensuring quick and reliable travel for urban commuters.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
        {/* <div className="row1"> */}
          <div className="service-col">
            <div className="image">
              <TbReport size={45} />
            </div>
            <h3>Reports</h3>
            <p>
              Generate and display reports on device activities, including
              distance traveled, stops, and events.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
            <div className="image">
              <HiOutlineBellAlert size={45} />
            </div>
            <h3>Alerts</h3>
            <p>
              Set up and display alerts for events such as overspeeding, low
              battery, or device offline.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
        {/* </div> */}
        {/* <div className="row2"> */}
          <div className="service-col">
            <img src={GeofencingImage} />
            <h3>Geofencing</h3>
            <p>
              Implement geofencing features to define virtual boundaries.Notify
              users when a tracked device enters or exits a geofence.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
          <div className="service-col">
            <div className="image">
              <TbGps size={45} />
            </div>
            <h3>Compatibility</h3>
            <p>
              Supports GPS device protocols from over 200 manufacturers,
              ensuring compatibility with a wide range of devices.
            </p>
            <button type="button">
              <FaAnglesLeft size={24} />
              Learn More
              <FaAnglesRight size={24} />
            </button>
          </div>
        </div>

        {/* </div> */}
      </section>
      {/* Services section ends */}
      {/* Contact section starts */}
      <section className="contacts" id="contact"></section>
      {/* Contact section ends */}
    </div>
  );
};

export default Banner;
