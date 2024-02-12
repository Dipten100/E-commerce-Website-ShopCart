import React from "react";
import PageHeader from "../components/PageHeader";
import CurrentOrder from "./CurrentOrder";
import OrderHistory from "./OrderHistory";
import "../orderList/OrderList.css"

const OrderList = () => {
  return (
    <div>
      <PageHeader
        title={"Current Order Details & Order History"}
        curPage={"order-page"}
      />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <CurrentOrder />
            <OrderHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
