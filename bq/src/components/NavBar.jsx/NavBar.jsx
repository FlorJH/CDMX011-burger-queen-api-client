import React, { useState } from "react";
import iconLogout from "../../assets/salir.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/banner.png";
import { auth, logout } from "../../lib/firebase";

const NavBar = () => {
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
  return (
    <div>
      <div className="navBar">
        <img src={logo} alt="logonav" className="logoNav" />
        <div className="logout">
        <div className="textlogout">
          <img
            src={iconLogout}
            alt="iconlogout"
            className="icon"
            onClick={handleLogout}
          />
          <section onClick={handleLogout}>Sign Off</section>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      </div>

    </div>
  );
};
export default NavBar;
