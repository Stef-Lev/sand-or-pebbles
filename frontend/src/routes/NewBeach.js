import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { postMethod } from "../helpers/services";

const ContentContainer = styled.div`
display: flex;
flex-direction: column;
`;

function NewBeach() {
  const [state, setState] = useState({title: null, location:null})

  const history = useHistory();

  const handleSubmit = () => {
    postMethod("http://localhost:7002/beaches", state).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  return (
    <>
      <section>
        <div>
          <label>Title</label>
          <input type="text" onChange={(e) => setState({...state, title: e.target.value})} />
        </div>
        <div>
          <label>Location</label>
          <input type="text" onChange={(e) => setState({...state, location: e.target.value})} />
        </div>
        <button onClick={handleSubmit}>Add beach</button>
      </section>
    </>
  );
}

export default NewBeach;
