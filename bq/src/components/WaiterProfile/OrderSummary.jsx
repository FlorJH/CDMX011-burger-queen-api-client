import React, {useState} from "react";
import iconDelete from "../../assets/eliminar.png";
// const initailForm = {
//   name: "",
  
// };

export const OrderSummary = (props) => {
  let { orderItems, onRemove, createOrder } = props;
  const totalPrice = orderItems.reduce((a, c) => a + c.qty * c.price, 0);
  const [nameState, setName] = useState({}); 
  const handleName = (e) => setName({ ...nameState, name: e.target.value });

  // const handleReset = (e) => {
  //   orderItems={};
  //   setName(initailForm);
    
  // };


  const { name } = nameState;

  return (
    <div className="content__order__summary">
      <section className="name__user">
        <input
          className="name"
          placeholder="Add Customer Name"
          onChange={handleName}
          required
        ></input>
      </section>
      <div>
        {orderItems.length === 0 && <div>Order is empty</div>}
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
            <button className="secondary-button" onClick={()=>createOrder(props, totalPrice, name) } >Send Order</button>
            <h2 className="total">Total: {totalPrice.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </div>
  );
};