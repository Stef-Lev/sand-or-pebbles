import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getOneMethod, deleteMethod } from "../helpers/services";

function ShowBeach() {
  const { id } = useParams();
  const history = useHistory();

  const [beach, setBeach] = useState(null);

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((beach) => setBeach(beach))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
    deleteMethod("http://localhost:7002/beaches/", id).then((res) => { console.log(res); history.push('/beaches') })
  }

  return (
    <div>
      {beach && (
        <>
          <h1>{beach.title}</h1>
          <h2>{beach._id}</h2>
          <h3>
            <Link to={`/beaches/${id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
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
