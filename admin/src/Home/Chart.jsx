import axios from "axios";
import React, { useEffect, useState } from "react";

const Chart = () => {
  const [TopProducts, setTopProducts] = useState([]);
  const [barsData, setBarsData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/topSellingProducts")
      .then((res) => {
        setTopProducts(res.data);
        const getHighest=()=>{
          let highest = 0;
          res.data.map((product)=>{
            if(highest<=product.sellingAmount){
              highest=product.sellingAmount;
            }
          })
          return highest;
        }
        let highest=getHighest()

        const newBarsData = res.data.map((product) => {
          const percentage = (product.sellingAmount / highest) * 100;
          return { id: product.productName, percentage };
        });
        setBarsData(newBarsData);
      })
      .catch((error) => console.log(error));

    const bars = document.querySelectorAll(".bars .bar");

    bars.forEach((bar, index) => {
      const percentage = parseInt(bar.dataset.percentage, 10);

      bar.style.transition = `height 1s ease ${index * 100}ms`;
      bar.style.height = `${percentage}%`;
    });
  });

  return (
    <div className="d-flex justify-content-center">
      <main className="container">
        <div className="charts">
          <div className="charts-card">
            <p className="chart-title">Top 5 sold Products</p>
            <div className="bar-chart">
              <div className="chart">
                <ul className="numbers">
                  <li>
                    <span>100%</span>
                  </li>
                  <li>
                    <span>50%</span>
                  </li>
                  <li>
                    <span>0%</span>
                  </li>
                </ul>
                <ul className="bars">
                  {barsData.map((bar) => (
                    <li key={bar.id}>
                      <div
                        className="bar"
                        data-percentage={bar.percentage}
                      ></div>
                      <span>{`${bar.id}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="more-details">
              <h3>Product Sold</h3>
              {TopProducts &&
                TopProducts.map((item, i) => (
                  <div key={i} className="details">
                    <label>{item.productName}</label>
                    <span>{item.sellingAmount}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chart;
