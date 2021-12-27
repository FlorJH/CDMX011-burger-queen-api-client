import React from "react";
import { FoodMenu } from "./FoodMenu";

export const DataIteration = (props) => {
  const { products, onAdd } = props;
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <FoodMenu key={product.id} product={product} onAdd={onAdd} />
        ))
      ) : (
        <div className="msg-empty">
          <h2>No data</h2>
        </div>
      )}
    </>
  );
};
