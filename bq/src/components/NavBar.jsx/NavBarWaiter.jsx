import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../lib/firebase";
import logo from "../../assets/banner.png";
import iconLogout from "../../assets/salir.png";
import iconCommand from "../../assets/icons8-camarero.png";
import iconOrder from "../../assets/order.png";
const NavBarWaiter = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(auth);
      console.log("saliendo de app");
      navigate("/");
    } catch (error) {
      setError("Server Error");
    }
  };
  const handleCommand = () => {
    navigate("/ReadyOrders");
  };
  const handleOrders = () => {
    navigate("/WaiterProfile");
  };
  return (
    <div className="navBar">
      <img src={logo} alt="logonav" className="logoNav" />
      <div className="logout">
        <div className="textlogout">
          <img
            src={iconOrder}
            alt="iconOrder"
            className="icon"
            onClick={handleOrders}
          />
          <section className="waiter-option" onClick={handleOrders}>Orders</section>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="textlogout">
          <img
            src={iconCommand}
            alt="iconCommand"
            className="icon"
            onClick={handleCommand}
          />
          <section className="waiter-option" onClick={handleCommand}>Command</section>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="textlogout">
          <img
            src={iconLogout}
            alt="iconlogout"
            className="icon"
            onClick={handleLogout}
          />
          {/* <section onClick={handleLogout}>Sign Off</section> */}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};
export default NavBarWaiter;
