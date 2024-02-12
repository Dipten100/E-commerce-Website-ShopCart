import React from "react";
import { Link } from "react-router-dom";

const title = "About ShopCart";
const desc =
  "This is ShopCart Admin Page where you can add new product, update product details and delete product details and also see the order details.";
const ItemTitle = "Categories";
const quickTitle = "Quick Links";

const addressList = [
  {
    iconName: "icofont-google-map",
    text: " Howrah, WestBengal.",
  },
  {
    iconName: "icofont-phone",
    text: " +91 7044083537",
  },
  {
    iconName: "icofont-envelope",
    text: " diptenkarmakar01@gmail.com",
  },
];

const socialList = [
  {
    iconName: "icofont-facebook",
    siteLink: "#",
    className: "facebook",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "#",
    className: "twitter",
  },
  {
    iconName: "icofont-linkedin",
    siteLink: "#",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    siteLink: "#",
    className: "instagram",
  },
  {
    iconName: "icofont-pinterest",
    siteLink: "#",
    className: "pinterest",
  },
];

const ItemList = [
  {
    text: "Add Items",
    link: "/add",
  },
  {
    text: "Order List",
    link: "/order",
  },
  {
    text: "Policy",
    link: "#",
  },
  {
    text: "FAQs",
    link: "/contact",
  },
];

const quickList = [
  {
    text: "Summer Sessions",
    link: "#",
  },
  {
    text: "Events",
    link: "#",
  },
  {
    text: "Gallery",
    link: "#",
  },
  {
    text: "Forums",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Terms of Use",
    link: "#",
  },
];

const footerbottomList = [
  {
    text: "Faculty",
    link: "#",
  },
  {
    text: "Staff",
    link: "#",
  },
  {
    text: "Students",
    link: "#",
  },
  {
    text: "Alumni",
    link: "#",
  },
];

const Footer = () => {
  return <footer className="style-2">
    <div className="footer-top dark-view padding-tb">
        <div className="container">
            <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
                <div className="col">
                    <div className="footer-item our-address">
                        <div className="footer-inner">
                            <div className="footer-content">
                                <div className="title">
                                    <h4>{title}</h4>
                                </div>
                                <div className="content">
                                    <p>{desc}</p>
                                    <ul className="lab-ul office-address">
                                        {
                                            addressList.map((val, i)=>(
                                                <li key={i}>
                                                    <i className={val.iconName}>{val.text}</i>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <ul className="lab-ul social-icons">
                                        {
                                            socialList.map((val, i)=>(
                                                <li key={i}>
                                                    <a href="#" className={val.className}><i className={val.iconName}>{val.text}</i></a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="footer-item our-address">
                        <div className="footer-inner">
                            <div className="footer-content">
                                <div className="title">
                                    <h4>{ItemTitle}</h4>
                                </div>
                                <div className="content">
                                    <ul className="lab-ul office-address">
                                        {
                                            ItemList.map((val, i)=>(
                                                <li key={i}>
                                                    <a href={val.link}>{val.text}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="footer-item our-address">
                        <div className="footer-inner">
                            <div className="footer-content">
                                <div className="title">
                                    <h4>{quickTitle}</h4>
                                </div>
                                <div className="content">
                                    <ul className="lab-ul office-address">
                                        {
                                            quickList.map((val, i)=>(
                                                <li key={i}>
                                                    <a href={val.link}>{val.text}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* footer bottom */}
    <div className="footer-bottom">
        <div className="container">
            <div className="section-wrapper">
                <p>&copy; 2023 <Link to="/">Designed by </Link><a href="/" target="_blank">Dipten</a></p>
                <div className="footer-bottom-list">
                    {
                        footerbottomList.map((val, i)=>(
                            <a href="#" key={i}>{val.text}</a>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  </footer>;
};

export default Footer;
