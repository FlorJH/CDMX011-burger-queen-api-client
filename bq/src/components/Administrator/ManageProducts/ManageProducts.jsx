/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import Footer from "../../Footer/Footer";
import { NavBarAdministrator } from "../../NavBar.jsx/NavBarAdministrator";
import { CrudForm } from "./CrudForm";
import PreLoad from "../../PreLoad/PreLoad";
import NotFound from "../../NotFound/NotFound";
import { ProductsIteration } from './ProductsIteration';
export const ManageProducts = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "https://api-burger-heroku.herokuapp.com/product";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      console.log(res);
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();
    //console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Are you sure to delete the record with the id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
    <div className="content-manager-Products">
      <header>
        <NavBarAdministrator />
      </header>
      <div className="container-products">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <PreLoad />}
        {error && <NotFound />}
        <section className="container-products-exist">
        {db && (
          <ProductsIteration
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </section>{" "}
      </div>
      </div>
      <footer>
        <Footer />
      </footer>
   
    </>
  );
};
