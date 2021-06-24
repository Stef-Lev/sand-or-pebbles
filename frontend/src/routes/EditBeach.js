import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod } from "../helpers/services";
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

function EditBeach() {
  const { id } = useParams();
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    imageUrl: "",
  });

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

  const { title, location, description, imageUrl } = state;

  return (
    <>
      <ContentContainer>
        <Typography variant="h4">Update Beach</Typography>
        <DataForm>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setState({ ...state, location: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Image Url"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setState({ ...state, imageUrl: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            multiline
            rows={5}
            rowsMax={10}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            fullWidth
          />
          <StyledButton onClick={handleUpdate} variant="contained">
            Update Beach
          </StyledButton>
        </DataForm>
      </ContentContainer>
      <Link to={`/beaches/${id}`}>Back to beach</Link>
    </>
  );
}

export default EditBeach;
