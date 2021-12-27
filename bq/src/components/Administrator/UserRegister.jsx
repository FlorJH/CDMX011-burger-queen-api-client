import React from "react";
import Sweet from "sweetalert2";
import { register } from "../../lib/firebase";
import iconEmail from "../../assets/email.png";
import iconPassword from "../../assets/password.png";

export const UserRegister = ({ dataToEdit }) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const emailUser = e.target.elements.emailUser.value;
    const passwordUser = e.target.elements.passwordUser.value;
    const rolUser = e.target.elements.rolUser.value;

    try {
      await register(emailUser, passwordUser, rolUser);
      new Sweet({
        title: "Registered user",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonColor: "#FF4848",
        background: "#FAEEE0",
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
      new Sweet({
        title: "Error",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "#FF4848",
        background: "#FAEEE0",
      });
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={submitHandler}>
        <div className="input-form">
          <img className="icon" src={iconEmail} alt="iconEmail" />
          <input
            type="emailUser"
            id="emailUser"
            placeholder="User email"
            required
          />
        </div>

        <div className="input-form">
          <img className="icon" src={iconPassword} alt="iconPassword" />
          <input
            type="passwordUser"
            id="passwordUser"
            placeholder="write password"
            required
          />
        </div>

        <select
          id="rolUser"
          className="input-form"
          placeholder="Chose a profile"
          required
        >
          <option value="0">Rol</option>
          <option value="admin">Administrator</option>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
        </select>
        <button className="register-button">Register </button>
      </form>
    </>
  );
};
