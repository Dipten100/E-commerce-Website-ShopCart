import React, { useContext, useEffect } from "react";

import "../Home/dashboard.css";
import Cards from "./Cards";
import TotalEarnings from "./TotalEarnings";
import Chart from "./Chart";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const Dashboard = () => {
  const { Admin } = useContext(AllContext);
  let flag = false;
  if (Admin) {
    flag = true;
  } else {
    flag = false;
  }
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/setup/dashboard").then((res)=>{
    }).catch((error)=>console.log(error))
  },[])

  return (
    <>
      {flag && (
        <div className="dashboard-content padding-tb">
          <div className="container">
            <div className="row justify-content-center">
              <div class="d-flex align-items-center glow dashboard-header">
                <i class="icofont-dashboard me-3 c-white fs-32"></i>
                <h2 class="fs-2 m-0 c-white">Dashboard</h2>
              </div>
              <div className="col-lg-8 col-12">
                <div>
                  <Cards />
                  <Chart />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <aside>
                  <TotalEarnings />
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        !flag && (
          <div className="dashboard-content padding-tb">
          <div className="container">
            <div className="row justify-content-center">
              <p>First Login then show the Dashboard</p>
            </div>
          </div>
          </div>
        )
      }
    </>
  );
};

export default Dashboard;
