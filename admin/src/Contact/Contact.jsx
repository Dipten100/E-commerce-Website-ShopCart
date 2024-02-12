import React from "react";
import PageHeader from "../Components/PageHeader";

import "../Contact/conatct.css"

const Contact = () => {
  return (
    <div>
      <PageHeader title={"Contact to developer"} />
      <div className="container padding-tb">
        <div className="row g-4 row-cols-1 align-items-center">
          <div className="col">
            <div className="section-wrapper">
              <form action="" className="row">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your name"
                  className="contact-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email Id"
                  className="contact-input"
                  required
                />
                <input
                  type="number"
                  name="number"
                  id="number"
                  min={10}
                  max={10}
                  placeholder="Enter Your Mobile Number"
                  className="contact-input"
                  required
                />
                <textarea
                  type="text"
                  name="desc"
                  id="dec"
                  placeholder="Description"
                  className="contact-input"
                />
                <button type="submit" className="lab-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
