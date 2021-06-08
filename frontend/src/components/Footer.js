import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const StyledFooter = styled.div`
  background-color: #006994 !important;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2021 BeachFinder
          </Typography>
        </Toolbar>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
