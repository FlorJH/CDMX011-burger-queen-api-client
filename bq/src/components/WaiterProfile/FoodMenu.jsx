import React from "react";

export const FoodMenu = ( props ) => {
  let { product, onAdd } = props;

  return (
    <div
      className="content-menu"
      onClick={() => { 
        onAdd(product);
      }}
    >
      <picture className="content__img">
        <img className="img-menu" src={product.image} alt="Food ilustration" />
      </picture>
      <p className="title__food">{product.name}</p>
    </div>
  );
};
