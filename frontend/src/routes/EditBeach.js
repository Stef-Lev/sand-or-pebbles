import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod, postMethod } from "../helpers/services";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { useFormik } from 'formik';
import * as yup from 'yup';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .field {
    margin-bottom: 20px;
  }
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
    if (id) {
      getOneMethod("http://localhost:7002/beaches/", id)
        .then((beach) => {
          setState(beach);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleUpdate = () => {
    updateMethod("http://localhost:7002/beaches/", id, state).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  const handleSubmit = () => {
    postMethod("http://localhost:7002/beaches", state).then((res) => {
      console.log("SENT", res);
      history.push("/beaches");
    });
  };

  const { title, location, description, imageUrl } = state;

  return (
    <>
      <ContentContainer>
        <Typography variant="h4" className="field">
          {id ? 'Edit Beach' : 'Add Beach'}
        </Typography>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            className="field"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="field"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setState({ ...state, location: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="field"
            label="Image Url"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setState({ ...state, imageUrl: e.target.value })}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="field"
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
          <StyledButton onClick={id ? handleUpdate : handleSubmit} variant="contained">
            {id ? 'Update Beach' : 'Add Beach'}
          </StyledButton>
        </Grid>
        {id && <Link to={`/beaches/${id}`}>Back to beach</Link>}
      </ContentContainer>
    </>
  );
}

export default EditBeach;
