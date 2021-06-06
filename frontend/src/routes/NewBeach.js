import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postMethod } from "../helpers/services";

function NewBeach() {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);

  const history = useHistory();

  const handleSubmit = () => {
    const body = {
      location: location,
      title: title,
    };

    postMethod("http://localhost:7002/beaches", body).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  return (
    <>
      <section>
        <div>
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Location</label>
          <input type="text" onChange={(e) => setLocation(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Add beach</button>
      </section>
    </>
  );
}

export default NewBeach;
