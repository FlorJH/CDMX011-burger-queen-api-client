import React from "react";
import  iconDelete  from "../../../assets/deleteIcons.png";
import  iconEdit  from "../../../assets/editIcons.png";

export const CrudTableProducts = ({ product, setDataToEdit, deleteData }) => {
  return (
    <>
      <div className="content-menu-products">
        <picture className="content-img-products">
          <img className="img-products" src={product.image} alt={product.name} />
        </picture>
        <section className="title-food-product">
        <p>{product.name}</p>
        <p className="price-products">${product.price}.00</p>
        </section>
        <section className="actions-image">
        <img
          src={iconDelete}
          alt="iconAdd"
          className="icon-list-products"
          onClick={() => deleteData(product.id)}
        />
        <img
          src={iconEdit}
          alt="iconAdd"
          className="icon-list-products"
          onClick={() => setDataToEdit(product)}
        />
      </section>
      </div>
    </>
  );
};
