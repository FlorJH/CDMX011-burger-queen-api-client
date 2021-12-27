import React, { useState } from "react";
import iconDelete from "../../assets/eliminar.png";

const OrderSummary = (props) => {
  let { orderItems, onRemove, createOrder, cleanOrder } = props;
  const totalPrice = orderItems.reduce((a, c) => a + c.qty * c.price, 0);
  const [nameState, setName] = useState({});
  const handleName = (e) => setName({ ...nameState, name: e.target.value });

  const { name } = nameState;

  return (
    <form
      className="content__order__summary"
      onSubmit={(e) => {
        e.preventDefault();
        createOrder(props, totalPrice, name); //*
        e.target.reset();
        cleanOrder();
      }}
    >
      <section className="name__user">
        <input
          className="name"
          placeholder="Add Customer Name"
          onChange={handleName}
          required
        ></input>
      </section>
      <div>
        {orderItems.length === 0 && (
          <div className="empty-order">Select dishes from menu.</div>
        )}
        {orderItems.map((item) => (
          <section key={item.id} className="summary">
            <p>{item.name}</p>
            <p className="quantity-price">
              {item.qty} x $ {item.price}
            </p>
            <img
              className="icon"
              src={iconDelete}
              alt="iconDelete"
              onClick={() => onRemove(item)}
            />
          </section>
        ))}
        {orderItems.length !== 0 && (
          <div className="summary-total">
            <button className="secondary-button">Send Order</button>
            <h2 className="total">Total: {totalPrice.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </form>
  );
};
export default OrderSummary;
