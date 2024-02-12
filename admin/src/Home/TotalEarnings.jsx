import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalEarnings = () => {
  const [Earning, setEarning] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:9002/auth/dashboard").then((res)=>{
      if(res.data.message==="Dashboard data receive"){
        const dashboard=res.data.dashboard
        let earning=dashboard.TotalEarnings
        setEarning(earning)
      }
    }).catch((error)=>console.log(error))
  });

  return (
    <div className="d-flex" id="wrapper">
      <div id="page-content-wrapper">
        <div className="container-fluid px-4 mt-5">
          <div className="row g-3 my-2">
            <div className="p-3 bg-white d-flex justify-content-center align-items-center earning">
              <div className="round-chart-section">
                <div className="round-chart">
                  <div className="outer">
                    <div className="inner">
                      <div id="number" className="C-B-B">
                      <i className="icofont-rupee"></i> {Earning}
                      </div>
                    </div>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="160px"
                    height="160px"
                  >
                    <defs>
                      <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
              <div>
                <h3>Total Earning</h3>
              </div>
            </div>
            {/* <div className="col-lg-6 col-12 justify-content-center align-items-center Yearly-earning-section">
              <div className="round-chart-section ">
                <div className="round-chart">
                  <div className="outer">
                    <div className="inner">
                      <div id="number" className="C-B-B">
                        <div>$ {Earning}</div>
                        <div>2024</div>
                      </div>
                    </div>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="160px"
                    height="160px"
                  >
                    <defs>
                      <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h5 className="C-B-B">Yearly Earning</h5>
              </div>
            </div>
            <div className="col-lg-6 col-12 justify-content-center align-items-center Yearly-earning-section">
              <div className="round-chart-section ">
                <div className="round-chart">
                  <div className="outer">
                    <div className="inner">
                      <div id="number" className="C-B-B">
                        <div>$ {Earning}</div>
                        <div>January</div>
                      </div>
                    </div>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="160px"
                    height="160px"
                  >
                    <defs>
                      <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h5 className="C-B-B">Monthly Earning</h5>
              </div>
            </div>
            <div className="p-3 bg-white d-flex justify-content-center align-items-center earning">
              <div className="profit-loss">
                <h3>
                  <div className="profit c-green hidden">
                    {" "}
                    <i className="icofont-bubble-up fs-1 rounded-full p-2 ico"></i>
                    profit <span>10%</span>
                  </div>
                  <div className="loss c-red">
                    <i className="icofont-bubble-down fs-1 rounded-full p-2 ico"></i>
                    Loss <span>10%</span>
                  </div>
                </h3>
              </div>
              <p className="caution">According to previous month</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarnings;
