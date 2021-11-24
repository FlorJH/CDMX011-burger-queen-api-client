import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {

  let { name, image, id } = el;

  return (
    <tr>
      <td>{name}</td>
      <td><img className="imag__menu" src={image} alt="proof" /></td>

      <td>
        {/* <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button> */}
      </td>
    </tr>
  );
};

export default CrudTableRow;