import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneMethod, updateMethod, postMethod } from "../helpers/services";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { handleApiResponse as handleRes } from "../helpers/handleApiResponse";
import { Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useFormik } from "formik";
import { validationSchema } from "../helpers/validationSchema";
import { theme } from "../helpers/theme";
import TextInput from "../components/TextInput";
import SliderInput from "../components/SliderInput";
import FormButton from "../components/FormButton";
import CircularProgress from "@material-ui/core/CircularProgress";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .field {
    margin-bottom: 20px;
  }
`;

const inputStyle = {
  marginBottom: "22px",
};

const EditBeach = () => {
  const { id } = useParams();
  const formRef = useRef(null);
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    type: "",
    imageUrl: "",
    sandQuality: 3,
  });
  const [loading, setLoading] = useState(true);

  const INITIAL_FORM_VALUES = {
    title: id && state.title ? state.title : "",
    location: id && state.location ? state.location : "",
    description: id && state.description ? state.description : "",
    type: id && state.type ? state.type : "",
    imageUrl: id && state.imageUrl ? state.imageUrl : "",
    sandQuality: id && state.sandQuality ? state.sandQuality : 3,
  };

  const history = useHistory();

  useEffect(() => {
    if (id) {
      getOneMethod("http://localhost:7002/beaches/", id)
        .then((response) => {
          setState(response.data);
          setLoading(false);
        })
        .catch((err) => console.log("ERROR,ERROR!", err));
    }
  }, [id]);

  const handleUpdate = (values) => {
    console.log("UPDATE", values);
    updateMethod("http://localhost:7002/beaches/", id, values)
      .then((response) => {
        setLoading(false);
        handleRes(
          response,
          () => history.push("/beaches"),
          () => console.log("Open Modal")
        );
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  const handleSubmit = (values) => {
    console.log("SUBMIT", values);
    postMethod("http://localhost:7002/beaches", values)
      .then((response) => {
        handleRes(
          response,
          () => history.push("/beaches"),
          () => console.log("Open Modal")
        );
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  return (
    <>
      {loading && (
        <CircularProgress
          size="140px"
          style={{
            color: theme.primaryColor,
            margin: "36px",
          }}
        />
      )}
      {!loading && (
        <ContentContainer>
          <Typography variant="h4" className="field">
            {id ? "Edit Beach" : "Add Beach"}
          </Typography>

          <Grid item xs={12} md={6}>
            <Formik
              innerRef={formRef}
              initialValues={{ ...INITIAL_FORM_VALUES }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                id ? handleUpdate(values) : handleSubmit(values);
              }}
            >
              {(props) => {
                const { values, initialValues, setFieldValue } = props;

                // console.log(values);
                console.log("INITIAL", initialValues.sandQuality);
                console.log("STATE", state.sandQuality);

                return (
                  <Form>
                    <TextInput name="title" label="Title" style={inputStyle} />
                    <TextInput
                      name="location"
                      label="Location"
                      style={inputStyle}
                    />
                    <TextInput
                      name="imageUrl"
                      label="Image URL"
                      style={inputStyle}
                    />
                    <SliderInput
                      onFormChange={setFieldValue}
                      defaultValue={state.sandQuality}
                    />
                    <TextInput
                      name="description"
                      label="Description"
                      multiline
                      minRows={5}
                      maxRows={10}
                      style={inputStyle}
                    />
                    <FormButton>{id ? "Update Beach" : "Add Beach"}</FormButton>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          {id && <Link to={`/beaches/${id}`}>Back to beach</Link>}
        </ContentContainer>
      )}
    </>
  );
};

export default EditBeach;
