import { Outlet } from "react-router-dom";
import "./App.css";
import Navber from "./Components/Navber";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navber />
      <div className="min-vh-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
