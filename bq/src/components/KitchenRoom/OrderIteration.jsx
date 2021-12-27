import React from "react";
import { FoodOrder } from "./FoodOrder";
export const OrderIteration = (props) => {
  const { orders, updateData, closeOrder } = props;
  return (
    <>
      {orders.length > 0 ? (
        orders.map((order) => (
          <FoodOrder
            key={order.id}
            order={order}
            updateData={updateData}
            closeOrder={closeOrder}
          />
        ))
      ) : (
        <div className= "msg-empty">
            <h2 >No orders</h2>
          </div>
      )}
    </>
  );
};
