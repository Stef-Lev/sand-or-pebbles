import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { theme } from "../helpers/theme";
import { useFormikContext } from "formik";

const StyledButton = styled(Button)`
  && {
    background-color: ${theme.primaryColor};
    color: white;
    :hover {
      background-color: #0a4861;
    }
  }
`;

const FormButton = ({ children, ...props }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    onClick: handleSubmit,
  };

  return <StyledButton {...configButton}>{children}</StyledButton>;
};

export default FormButton;
