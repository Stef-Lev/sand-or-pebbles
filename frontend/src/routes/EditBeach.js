import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod, postMethod } from "../helpers/services";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { handleApiResponse as handleRes } from '../helpers/handleApiResponse';
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { validationSchema } from "../helpers/validationSchema";
import SandSlider from "../components/SandSlider";
import { theme } from '../helpers/theme';

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
    background-color: ${theme.primaryColor};
    color: white;
    :hover {
      background-color: #0a4861;
    }
  }
`;

const Field = styled(TextField)`
  & label.Mui-focused {
    color: ${theme.primaryColor};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${theme.primaryColor};
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

  const formik = useFormik({
    initialValues: {
      title: id && state.title ? state.title : "",
      location: id && state.location ? state.location : "",
      description: id && state.description ? state.description : "",
      imageUrl: id && state.imageUrl ? state.imageUrl : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      id ? handleUpdate(values) : handleSubmit(values);
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (id) {
      getOneMethod("http://localhost:7002/beaches/", id)
        .then((response) => {
          setState(response.data);
        })
        .catch((err) => console.log("ERROR,ERROR!", err));
    }
  }, [id]);

  const handleUpdate = (values) => {
    console.log("UPDATE", values);
    updateMethod("http://localhost:7002/beaches/", id, values)
      .then((response) => {
        handleRes(response,
          () => history.push('/beaches'),
          () => console.log('Open Modal')
        )
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  const handleSubmit = (values) => {
    console.log("SUBMIT", values);
    postMethod("http://localhost:7002/beaches", values)
      .then((response) => {
        handleRes(response,
          () => history.push('/beaches'),
          () => console.log('Open Modal')
        )
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  return (
    <>
      <ContentContainer>
        <Typography variant="h4" className="field">
          {id ? "Edit Beach" : "Add Beach"}
        </Typography>

        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
            <Field
              id="outlined-title"
              name="title"
              className="field"
              label="Title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Field
              id="outlined-location"
              name="location"
              className="field"
              label="Location"
              variant="outlined"
              value={formik.values.location}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <Field
              id="outlined-image"
              name="imageUrl"
              className="field"
              label="Image Url"
              variant="outlined"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
            <SandSlider />
            <Field
              id="outlined-description"
              name="description"
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
              helperText={formik.touched.description && formik.errors.description}
            />
            <StyledButton
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
