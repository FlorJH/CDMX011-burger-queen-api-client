import React from "react";

import { FoodMenu } from "./FoodMenu";

const DataIteration = ({ data, addToOrder }) => {

  return (
    <>
      {data.length > 0 ? (
        data.map((el) => (
          // console.log('map'+el)

          <FoodMenu key={el.id} el={el} addToOrder={addToOrder} />
          
        ))
      ) : (
        <tr>
          <td colSpan="3">Sin datos</td>
        </tr>
      )}

    </>
  );
};

export default DataIteration;

