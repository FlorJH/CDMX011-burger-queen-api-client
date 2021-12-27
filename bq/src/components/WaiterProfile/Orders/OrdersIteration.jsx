import React from 'react'
import { FoodOrdersReady } from './FoodOrdersReady';

export const OrdersIteration = ({orders, closeOrder,  updateData}) => {
    return (
        <>
        {orders.length > 0 ? (
          orders.map((order) => (
            <FoodOrdersReady
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
    )
}

