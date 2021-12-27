/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp.js";
import SweetAlert from "sweetalert2";
import { auth } from "../../lib/firebase.js";
import PreLoad from "../PreLoad/PreLoad";
import NotFound from "../NotFound/NotFound";
import MenuOption from "./MenuOption.jsx";
import OrderSummary from "./OrderSummary";
import Footer from "../Footer/Footer";
import { DataIteration } from "../WaiterProfile/DataIteration";
import NavBarWaiter from "../NavBar.jsx/NavBarWaiter";
const WaiterProfile = () => {
  
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typeFood, setTypeFood] = useState("Breakfast");
  const [orderItems, setOrderItems] = useState([]);
  const cleanOrder = () => {
    setOrderItems([]);
  };
  const onAdd = (product) => {
    const exist = orderItems.find((x) => x.id === product.id);
    if (exist) {
      setOrderItems(
        orderItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setOrderItems([...orderItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = orderItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setOrderItems(orderItems.filter((x) => x.id !== product.id));
    } else {
      setOrderItems(
        orderItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  let url = `${process.env.REACT_APP_JSON_SERVER_PRODUCT}?type=${typeFood}`;
  let api = helpHttp();
  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);
  const user = auth.currentUser;
  const createOrder = (dataOrder, total, name) => {
    const id = Date.now();
    let options = {
      body: {
        id: id,
        ...dataOrder,
        total,
        status: "Pending",
        userName: name,
        dateOrder: new Date(),
        waiterName: user.email
      },
      headers: { "content-type": "application/json" },
    };
    api
      .post(`${process.env.REACT_APP_JSON_SERVER_ORDER}`, options)
      .then((res) => {
        console.log(res);
        if (!res.err) {
          new SweetAlert({
            title: "Order shipped",
            text: "Your order has been sent to the chef",
            showConfirmButton: true,
            confirmButtonColor: "#FF4848",
            background: "#FAEEE0",
          });
        } else {
          setError(res);
        }
      });
  };
  return (
    <div>
      <div className="content__waiter__profile">
        <NavBarWaiter />
        <div className="container__menu">
          <section className="column__container">
            <OrderSummary
              cleanOrder={cleanOrder}
              orderItems={orderItems}
              onRemove={onRemove}
              createOrder={createOrder}
            />
          </section>
          <section className="column__container">
            <MenuOption setTypeFood={setTypeFood} />
            {loading && <PreLoad />}
            {error && <NotFound />}
            <div className="container-food">
              {db && <DataIteration products={db} onAdd={onAdd} />}
            </div>
          </section>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default WaiterProfile;
