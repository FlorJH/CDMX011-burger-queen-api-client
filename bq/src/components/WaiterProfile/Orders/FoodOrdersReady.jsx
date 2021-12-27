import React from "react";
import iconUser from "../../../assets/user.png";

export const FoodOrdersReady = ({ order, closeOrder, updateData }) => {
  return (
    <div className="content-order">
      <header>
        <div className="content-profile">
          <img className="icon" src={iconUser} alt="iconUser" />
          <p>{order.userName}</p>
        </div>
        <div className="content-profile">
          <button
            className="third-button"
            key={order.id}
            onClick={(e) => {
              e.preventDefault();
              updateData(order);
              closeOrder(order);
            }}
          >
            Delivering
          </button>
       
        </div>
      </header>
      <section className="content-products">
        {order.orderItems.map((val) => {
          return (
            <section key={val.id} className="content-items">
              <div className="img-qty">
                <img className="img-order" src={val.image} alt={val.image} />
                <p>{val.qty}</p>
              </div>
              <p id="food-name">{val.name}</p>
            </section>
          );
        })}
      </section>
    </div>
  );
};
