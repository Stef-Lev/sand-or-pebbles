import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod, postMethod } from "../helpers/services";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object().shape({
  title: Yup.string("Enter the beach title").required("Title is required"),
  location: Yup.string("Enter the beach location").required(
    "Location is required"
  ),
  description: Yup.string("Enter the beach description").max(200, "Too long"),
  imageUrl: Yup.string("Enter the beach image").url(),
});

function EditBeach() {
  const { id } = useParams();
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      location: "",
      description: "",
      imageUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (id) {
      getOneMethod("http://localhost:7002/beaches/", id)
        .then((beach) => {
          setState(beach);
        })
        .catch((err) => console.log("ERROR,ERROR!", err));
    }
  }, [id]);

  const handleUpdate = () => {
    console.log("UPDATE", state);
    updateMethod("http://localhost:7002/beaches/", id, state)
      .then((res) => {
        console.log("SENT", res);
        // history.push("/beaches");
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  const handleSubmit = () => {
    console.log("SUBMIT", state);
    postMethod("http://localhost:7002/beaches", state)
      .then((res) => {
        console.log("SENT", res);
        // history.push("/beaches");
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  const { title, location, description, imageUrl } = state;

  return (
    <>
      <ContentContainer>
        <Typography variant="h4" className="field">
          {id ? "Edit Beach" : "Add Beach"}
        </Typography>

        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-title"
            className="field"
            label="Title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            id="outlined-location"
            className="field"
            label="Location"
            variant="outlined"
            value={formik.values.location}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <TextField
            id="outlined-image"
            className="field"
            label="Image Url"
            variant="outlined"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          />
          <TextField
            id="outlined-description"
            className="field"
            label="Description"
            variant="outlined"
            value={formik.values.description}
            multiline
            minRows={5}
            maxRows={10}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.description && Boolean(formik.errors.description)}
          />
          <StyledButton
            onClick={id ? handleUpdate : handleSubmit}
            variant="contained"
            type="submit"
          >
            {id ? "Update Beach" : "Add Beach"}
          </StyledButton>
          </form>
        </Grid>
        {id && <Link to={`/beaches/${id}`}>Back to beach</Link>}
      </ContentContainer>
    </>
  );
}

export default EditBeach;
