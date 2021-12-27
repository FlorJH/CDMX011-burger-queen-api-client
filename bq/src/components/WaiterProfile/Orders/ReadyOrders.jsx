/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp.js";
import { auth } from "../../../lib/firebase.js";
import SweetAlert from "sweetalert2";
import NavBarWaiter from "../../NavBar.jsx/NavBarWaiter";
import Footer from "../../Footer/Footer";
import PreLoad from "../../PreLoad/PreLoad";
import { OrdersIteration } from "./OrdersIteration";
import NotFound from "../../NotFound/NotFound";
//import { onAuthStateChanged } from "@firebase/auth";

export const ReadyOrders = () => {
  const user = auth.currentUser;
  console.log("email user" + user.email);
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${process.env.REACT_APP_JSON_SERVER_ORDER}`;
  console.log("email" + user.uid);
  const endpoint = `${url}?waiterName=${user.email}&status=Delivering`;
  let api = helpHttp();
  useEffect(() => {
    setLoading(true);
    api.get(endpoint).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, []);

  // const deleteData = async (id) => {
  //   console.log("id de order is ", id)
  //   let isDelete = window.confirm(
  //     `¿Are you sure to delete the record with the id '${id.id}'?`
  //   );
  //   if (isDelete) {
  //     let endpoint = `${url}/${id.id}`;
  //     let options = {
  //       headers: { "content-type": "application/json" },
  //     };
  //     const response = await api.del(endpoint, options);
  //     if (!response.err) {
  //       let newData = db.filter((el) => el.id !== id.id);
  //       setDb(newData);
  //     } else {
  //       setError(response);
  //     }
  //   }
  //   else {
  //     return;
  //   }
  // };
  const updateData = async (data) => {
    const endpoint = `${url}/${data.id}`;
    let options = {
      body: {
        status: "Delivered",
        hoursFinish: new Date(),
      },
      headers: { "content-type": "application/json" },
    };
    const response = await api.patch(endpoint, options);
    if (response.err) {
      return setError(response);
    }
    new SweetAlert({
      title: "Your order was delivered",
      showConfirmButton: true,
      confirmButtonColor: "#FF4848",
      background: "#FAEEE0",
    });
  };

  const closeOrder = (order) => {
    const close = db.filter((item) => item.id !== order.id);
    setDb(close);
  };

  return (
    <>
      <div className="content-kitchenRoom">
        <NavBarWaiter />
        <div className="container-food">
          {loading && <PreLoad />}
          {error && <NotFound />}
          {db && (
            <OrdersIteration
              orders={db}
              updateData={updateData}
              closeOrder={closeOrder}
            />
          )}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
