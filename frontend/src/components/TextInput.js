import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { theme } from "../helpers/theme";
import { useField } from "formik";

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${theme.primaryColor};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${theme.primaryColor};
    }
  }
`;

const TextInput = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const fieldConfig = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    fieldConfig.error = true;
    fieldConfig.helperText = meta.error;
  }

  return <StyledTextField {...fieldConfig} />;
};

export default TextInput;
