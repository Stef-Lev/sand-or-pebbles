import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllMethod } from "../helpers/services";

function MainPage() {
  const [data, setData] = useState("");

  const history = useHistory();

  useEffect(() => {
    getAllMethod("http://localhost:7002/beaches")
      .then((beaches) => setData(beaches))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>All Beaches</h1>
      <div>
        <button onClick={() => history.push("/beaches/new")}>New beach</button>
      </div>
      <ul>
        {data &&
          data.map((item, index) => {
            return (
              <li key={`100${index + 1}`}>
                <Link to={`/beaches/${item._id}`}>{item.title}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MainPage;
