import React from "react";
import iconDelete from "../../assets/eliminar.png";

export const OrderSummary = (items) => {
  const {orderItems,deleteToOrder, createOrder}=items;
  console.log(items)
  const totalPrice= orderItems.reduce((a , c) => a+c.price * c.qty, 0);


  return (
    <div className="content__order__summary">
      <section className="name__user">
        <input className="name" placeholder="Add Customer Name" required></input>
      </section>
      {orderItems.length === 0 && <div>order Empty</div>}
      {orderItems.map((itemFood)=> (
         
         <section key={itemFood.id} className="summary">
          <p>{itemFood.qty}</p> 
          <p> {itemFood.name}</p>
          <p>$ {itemFood.price}</p>
          <img onClick={()=>deleteToOrder(itemFood)} className="icon" src={iconDelete} alt="iconDelete" />
      
        </section>
        )
        )}
        {orderItems.length !== 0 && (
        <div className="summary-total">
            <button className="secondary-button" onClick={()=>createOrder(items, totalPrice)}>Send Order</button>
            <h2 className="total">Total: {totalPrice.toFixed(2)}</h2>
          </div>
          )}
    </div>
  );
};
