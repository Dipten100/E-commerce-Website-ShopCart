import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";

import 'swiper/css';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home/Home.jsx';
import Shop from './shop/Shop.jsx';
import SingleProduct from './shop/SingleProduct.jsx';
import CartPage from './shop/CartPage.jsx';
import About from './about/About.jsx';
import Contact from './contact/Contact.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import ForgotPage from './components/ForgotPage.jsx';
import ContextProvider from './contexts/ContextProvider.jsx';
import UserInformation from './userInfromation/UserInformation.jsx';
import OrderList from './orderList/OrderList.jsx';
import Register from './components/Register.jsx';
import PerticularOrderPage from './components/PerticularOrderPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextProvider><App/></ContextProvider>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/shop",
        element:<Shop/>
      },
      {
        path:"shop/:id",
        element:<SingleProduct/>
      },
      {
        path:"/cart-page",
        element:<CartPage/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/info/:id",
        element:<UserInformation/>
      },
      {
        path:"/orderList/:id",
        element:<OrderList/>
      },
      {
        path:"/perticularOrderPage/:id",
        element:<PerticularOrderPage/>
      },
    ]
  },
  {
    path:"/Register",
    element:<ContextProvider><Register/></ContextProvider>,
  },
  {
    path:"/forgotpass",
    element:<ContextProvider><ForgotPage/></ContextProvider>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
