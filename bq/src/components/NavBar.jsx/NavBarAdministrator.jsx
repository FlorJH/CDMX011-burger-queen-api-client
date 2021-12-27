import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../lib/firebase";
import logo from "../../assets/banner.png";
import iconLogout from "../../assets/salir.png";
import iconUsers from "../../assets/usersicon1.png";
import iconAdminProduct from "../../assets/productadmin1.png";
export const NavBarAdministrator = () => {
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
      const handleManageWorkers = () => {
        navigate("/AdminProfile");
      };
      const handleManageProducts = () => {
        navigate("/ManageProducts");
      };
 
        return (
            <div className="navBar">
              <img src={logo} alt="logonav" className="logoNav" />
              <div className="logout">
                <div className="textlogout">
                  <img
                    src={iconUsers}
                    alt="iconUsers"
                    className="icon"
                    onClick={handleManageWorkers}
                  />
                  <section className="waiter-option" onClick={handleManageWorkers}>Manage Workers</section>
                  {error && <div className="error">{error}</div>}
                </div>
                <div className="textlogout">
                  <img
                    src={iconAdminProduct}
                    alt="iconAdminProduct"
                    className="icon"
                    onClick={handleManageProducts}
                  />
                  <section className="waiter-option" onClick={handleManageProducts}>Manage Products</section>
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
    
}
