import React, { useEffect, useState } from "react";

function NewBeach() {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    console.log(title, location);
  }, [title, location]);

  const handleSubmit = () => {
    const sentData = {
      location: location,
      title: title
    };
    console.log(sentData);

    return fetch("http://localhost:7002/beaches", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(sentData),
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
