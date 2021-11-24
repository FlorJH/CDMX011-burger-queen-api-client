import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp.js";

import DataIteration from "../WaiterProfile/DataIteration";
import PreLoad from "../PreLoad/PreLoad";

import NotFound from "../NotFound/NotFound";

const CrudApiMock = () => {
  const [db, setDb] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  let url = "http://localhost:5000/product";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
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


  return (
    <>
      {loading && <PreLoad />}
      {error && <NotFound />}
      {db && <DataIteration data={db} />}
    </>
  );
};

export default CrudApiMock;

