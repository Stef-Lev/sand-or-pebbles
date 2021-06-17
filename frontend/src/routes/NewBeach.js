import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { postMethod } from "../helpers/services";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DataForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 320px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #006994;
    color: white;
    :hover {
      background-color: #0a4861;
    }
  }
`;

function NewBeach() {
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const history = useHistory();

  const handleSubmit = () => {
    postMethod("http://localhost:7002/beaches", state).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  return (
    <>
      <ContentContainer>
        <Typography variant='h4'>Add beach</Typography>
        <DataForm>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setState({ ...state, title: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            onChange={(e) => setState({ ...state, location: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Image Url"
            variant="outlined"
            onChange={(e) => setState({ ...state, imageUrl: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            rowsMax={10}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            fullWidth
          />
          <StyledButton
            onClick={handleSubmit}
            variant="contained"
          >
            Add beach
          </StyledButton>
        </DataForm>
      </ContentContainer>
    </>
  );
}

export default NewBeach;
