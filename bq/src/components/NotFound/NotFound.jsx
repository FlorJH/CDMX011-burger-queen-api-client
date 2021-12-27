import React from "react";
//import Footer from "../Footer/Footer";
import img from "../../assets/notfound.png";

 const NotFound = () => {
  return (
    <>
      <div className="container__notfound">
        <img src={img} alt="error" />
      </div>
      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
};
export default NotFound;

