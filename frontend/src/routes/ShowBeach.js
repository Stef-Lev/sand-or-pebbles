import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneMethod } from "../helpers/services";

function ShowBeach() {
  const { id } = useParams();

  const [beach, setBeach] = useState(null);

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((beach) => setBeach(beach))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      {beach && (
        <>
          <h1>{beach.title}</h1>
          <h2>{beach._id}</h2>
          <h3>
            <Link to={`/beaches/${id}/edit`}>Edit</Link>
          </h3>
          <footer>
            <Link to={"/beaches"}>Home</Link>
          </footer>
        </>
      )}
    </div>
  );
}

export default ShowBeach;
