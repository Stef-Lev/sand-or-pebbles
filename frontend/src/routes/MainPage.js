import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:7002/beaches")
      .then((res) => res.json())
      .then((beaches) => setData(beaches))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
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
