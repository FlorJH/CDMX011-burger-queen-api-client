import React, { useEffect, useState } from "react";
import { getUsers } from "../../lib/firebase";
import { updateUser } from "../../lib/firebase";
import SweetAlert from "sweetalert2";
import iconDelete from "../../assets/deleteUser.png";
import iconUpdate from "../../assets/updateUser.png";
import { removeUser } from "../../lib/firebase";
import iconEmail from "../../assets/iconEmail.png";
import iconRol from "../../assets/userRol.png";
export const ProfileCrud = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    showUser();
  }, [setUsers]);

  const showUser = async () => {
    const toUsers = await getUsers();
    setUsers(toUsers.docs);
  };
  //creo que falta manejo de pros
  const onRemove = (item) => {
    removeUser(item);
    showUser();
  };

  const update = async (data) => {
    const userEmail = data.email;
    await SweetAlert.fire({
      title: "Select a new rol for ",
      text: userEmail,
      input: "select",
      inputOptions: {
        "User rol": {
          Administrator: "admin",
          Chef: "chef",
          Waiter: "waiter",
        },
      },
      inputPlaceholder: "Select a new rol to update",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== "") {
            resolve();
            updateUser(data.uid, value);
          } else {
            resolve("You need to select a new role");
          }
        });
      },
    });
    showUser();
  };

  return (
    <>
      {/* <div > */}
      {users &&
        users.map((anUser, i) => (
          <section className="register-form-crud">
            <div key={i} className="user-container">
              <div className="labels-coumn">
                <label>
                  <img className="icon-user" src={iconEmail} alt="iconEmail" />
                  {anUser.data().email}
                </label>
                <label>
                  <img className="icon-user" src={iconRol} alt="iconRol" />
                  {anUser.data().rol}
                </label>
              </div>
              <div className="btn-actions">
                <img
                  className="icon"
                  src={iconDelete}
                  alt="iconDelete"
                  onClick={() => onRemove(anUser.data().uid)}
                />

                <img
                  className="icon"
                  src={iconUpdate}
                  alt="iconUpdate"
                  onClick={() => update(anUser.data())} //setdatatoedit
                />
              </div>
            </div>
          </section>
        ))}
    </>
  );
};
