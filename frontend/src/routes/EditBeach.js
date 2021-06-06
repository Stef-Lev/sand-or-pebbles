import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod } from "../helpers/services";

function EditBeach() {
  const { id } = useParams();
  const [beach, setBeach] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const history = useHistory();

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((beach) => {
        setBeach(beach);
        setTitle(beach.title);
        setLocation(beach.location);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = () => {
    const body = {
      location: location,
      title: title,
    };

    updateMethod("http://localhost:7002/beaches/", id, body).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  return (
    <>
      {beach && (
        <section>
          <div>
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
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
