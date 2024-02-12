import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css _

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//  fonts and icons

import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProducts from "./AddItems/AddProducts.jsx";
import AddCategory from "./AddCategory/AddCategory.jsx";
import Contact from "./Contact/Contact.jsx";
import SingleProduct from "./ShowItems/SingleProduct.jsx";
import OrderList from "./Order/OrderList.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import ContextProvider from "./contexts/ContextProvider.jsx";
import UserInformation from "./UserInformation/UserInformation.jsx";
import UpdatePage from "./Components/UpdatePage.jsx";
import Home from "./Home/Home.jsx";
import Registration from "./registration/Registration.jsx";
import AddNewProduct from "./AddItems/AddNewProduct.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextProvider><App /></ContextProvider>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/add",
        element: <AddProducts/>,
      },
      {
        path: "/add/product",
        element: <AddNewProduct/>,
      },
      {
        path: "/show/:id",
        element: <SingleProduct/>,
      },
      {
        path: "/update/:id",
        element: <UpdatePage/>,
      },
      {
        path: "/addCategory",
        element: <AddCategory/>,
      },
      {
        path: "/order",
        element: <OrderList/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path:"/info/:id",
        element:<UserInformation/>
      },
    ],
  },
  {
    path: "/Reg",
    element: <ContextProvider><Registration/></ContextProvider>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
