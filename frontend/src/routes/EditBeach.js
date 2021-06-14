import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod } from "../helpers/services";

function EditBeach() {
  const { id } = useParams();
  const [state, setState] = useState({title: null, location:null})

  const history = useHistory();

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((beach) => {
        setState(beach);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = () => {
    updateMethod("http://localhost:7002/beaches/", id, state).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  const {title, location} = state;

  return (
    <>
      {state && (
        <section>
          <div>
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setState({...state, title: e.target.value})}
              value={title}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              onChange={(e) => setState({...state, location: e.target.value})}
              value={location}
            />
          </div>
          <button onClick={handleUpdate}>Update beach</button>
        </section>
      )}
      <Link to={`/beaches/${id}`}>Back to beach</Link>
    </>
  );
}

export default EditBeach;
