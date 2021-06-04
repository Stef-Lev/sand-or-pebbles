import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ShowBeach() {
  let { id } = useParams();
  const [beach, setBeach] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7002/beaches/${id}`)
      .then((res) => res.json())
      .then((beach) => setBeach(beach))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      {beach && (
        <>
          <h1>{beach.title}</h1>
          <h2>{beach._id}</h2>
        </>
      )}
    </div>
  );
}

export default ShowBeach;
