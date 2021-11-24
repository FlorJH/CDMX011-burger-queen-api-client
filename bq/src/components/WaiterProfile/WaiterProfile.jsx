import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp.js";

import DataIteration from "../WaiterProfile/DataIteration";
import PreLoad from "../PreLoad/PreLoad";
import NotFound from "../NotFound/NotFound";
//import CrudApi from "../CrudApi/CrudApi";
import NavBar from "../NavBar.jsx/NavBar";
import Footer from "../Footer/Footer";
import { OrderSummary } from "./OrderSummary";
// import CrudApiMock from "../ApiMock/CrudApiMock";


const WaiterProfile = () => {
  const [db, setDb] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [typeFood, setTypeFood] = useState('Breakfast');
  const [orderItems, setOrder] = useState([]);

  let api = helpHttp();
  let url = `http://localhost:5000/product?type=${typeFood}`;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        console.log(res);
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

  const addToOrder = (foodItem) => {
    console.log('holo' + foodItem.id)
    const exist = orderItems.find(x => x.id === foodItem.id)
    if (exist) {
      setOrder(orderItems.map((x) => x.id === foodItem.id ? { ...exist, qty: exist.qty + 1 } : x
      ));
    } else {
      setOrder([...orderItems, { ...foodItem, qty: 1 }])
    }
  }

  const deleteToOrder = (foodItem) => {
const exist=orderItems.find((x) => x.id=== foodItem.id)
if (exist.qty === 1) {
  setOrder(orderItems.filter((x)=> x.id !== foodItem.id));
  }
  else{
    setOrder(orderItems.map((x) => x.id === foodItem.id ? {...exist, qty:exist.qty-1}: x))
  }
  }

  const createOrder= (dataOrder, total) => {
   
    // dataOrder.id = Date.now();
    //console.log(data);

    let options = {
      body: {dataOrder, total},
      headers: { "content-type": "application/json" },
    };

    api.post('http://localhost:5000/order', options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  return (
    <div>
      <div className="content__waiter__profile">
        <NavBar />
        {/* <CrudApi /> */}

        <div className="container__menu">
          <section className="column__container">
            <OrderSummary 
            orderItems={orderItems}
            addToOrder={addToOrder} 
            deleteToOrder={deleteToOrder}
            createOrder={createOrder} />
          </section>
          <section className="column__container">
            {/* <MenuOption /> */}
            <div className="content-menu-option">
              <h3>Menu</h3>
              <section className="section__option">
                <button className="secondary-button" onClick={() => { setTypeFood('Breakfast') }}>Breakfast</button>
                <button className="secondary-button" onClick={() => { setTypeFood('Lunch') }}>Lunch</button>

              </section>
            </div>
            <div className="container-food">
              {/* <CrudApiMock /> */}
              {loading && <PreLoad />}
              {error && <NotFound />}
              {db && <DataIteration data={db} addToOrder={addToOrder} orderItems={orderItems} />}
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
