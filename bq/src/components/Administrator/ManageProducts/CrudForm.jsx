import React, { useState, useEffect } from "react";
import iconAdd from "../../../assets/icons8-añadir-24 1.png";
import iconReset from "../../../assets/reset 1.png";
const initialForm = {
  name: "",
  price: "",
  image: "",
  id: null,
  type: "",
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image || !form.type) {
      alert("incomplete data");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="form-products">
      <form onSubmit={handleSubmit}>
    <div className="section-imputs">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          onChange={handleChange}
          value={form.name}
          className="input-form"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={form.price}
          className="input-form"
        />
         <input
          type="text"
          name="type"
          placeholder="Breakfast or Lunch"
          onChange={handleChange}
          value={form.type}
          className="input-form"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          value={form.image}
          className="input-form"
        />
             <div className="section-icons">
          <img
            src={iconAdd}
            alt="iconAdd"
            className="icon-products"
            onClick={handleSubmit}
          />
          <img
            src={iconReset}
            alt="iconReset"
            className="icon-products"
            onClick={handleReset}
          />
       </div>
       </div>

      </form>
    </div>
  );
};
