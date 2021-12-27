/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import SweetAlert from "sweetalert2";
import NavBar from "../NavBar.jsx/NavBar";
import Footer from "../Footer/Footer";
import PreLoad from "../PreLoad/PreLoad";
import { NotFound } from "http-errors";
import { OrderIteration } from "./OrderIteration";
//import { auth } from "../../lib/firebase";

export const KitchenRoom = () => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const user = auth.currentUser;
  // console.log("user entry", user.email)

  let url = `${process.env.REACT_APP_JSON_SERVER_ORDER}`;
  let api = helpHttp();
  useEffect(() => {
    const endpoint = `${url}?status=Pending`;
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

  const timer = (data) => {
    const arrive = new Date(data.dateOrder);
    const diffMs = new Date() - arrive;
    // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const finishTime = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    // const finishTime = diffMins; //minutes
    return finishTime;
  };

  const updateData =  async data => {
    const endpoint = `${url}/${data.id}`;
    let options = {
      body: {
        status: "Delivering",
        hoursFinish: new Date(),
      },
      headers: { "content-type": "application/json" },
    };
    const response = await api.patch(endpoint, options);
      if (response.err) {
        return setError(response);
      }
      new SweetAlert({
          title: "This order took " + timer(data) + " minutes.",
          showConfirmButton: true,
          confirmButtonColor: "#FF4848",
          background: "#FAEEE0",
        });
  };
  const closeOrder = (order) => {
    const close = db.filter(item => item.id !== order.id);
    setDb(close);
  };

  return (
    <>
      <div className="content-kitchenRoom">
        <NavBar />
        <div className="container-food">
          {loading && <PreLoad />}
          {error && <NotFound />}
          {db && <OrderIteration orders={db} updateData={updateData}  closeOrder={closeOrder}/>}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
