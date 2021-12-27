import React from 'react'
import { CrudTableProducts } from './CrudTableProducts';
export const ProductsIteration = ({ data, setDataToEdit, deleteData }) => {
    return (
        <>
        {data.length > 0 ? (
          data.map((product) => (
            <CrudTableProducts
              key={product.id}
              product={product}
              setDataToEdit={setDataToEdit}
              deleteData={deleteData}
            />
          ))
        ) : (
          <div className="msg-empty">
            <h2>No products</h2>
          </div>
        )}
      </>
    )
}
