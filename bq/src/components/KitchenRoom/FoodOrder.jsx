import React from "react";
import iconUser from "../../assets/user.png";
import iconClock from "../../assets/clock.png";
export const FoodOrder = (props) => {
  let { order, updateData, closeOrder } = props;
  return (
    <div className="content-order">
      <header>
        <div className="content-profile">
          <img className="icon" src={iconUser} alt="iconUser" />
          <p>{order.userName}</p>
        </div>
        <div className="content-profile">
          <img className="icon" src={iconClock} alt="iconClock" />
          <p>{new Date(order.dateOrder).toLocaleTimeString()}</p>
        </div>
        <div className="content-profile">
          <img className="icon" src={iconUser} alt="iconUser" />
          <p>{order.waiterName}</p>
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
      <section className="action-btn">
        <button
          className="secondary-button"
          key={order.id}
          onClick={(e) => {
            e.preventDefault();
            updateData(order);
            closeOrder(order);
          }}
        >
          Ready
        </button>
      </section>
    </div>
  );
};
