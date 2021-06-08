import React from "react";
import styled from 'styled-components'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Link from '@material-ui/core/Link';

const StyledNavbar = styled(Toolbar)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #006994;
`
const LinkSection = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 12px;
`

const NavLink = styled(Link)`
text-transform: none;
`

const Navbar = () => {
  return (
    <AppBar position="static">
        <StyledNavbar>
      <LinkSection>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h5">BeachFinder</Typography>
      <Typography variant="body1">Beaches</Typography>
      <Typography variant="body1">About</Typography>
      <Typography variant="body1">New</Typography>
      </LinkSection>
      <LinkSection>
      <NavButton color="inherit">Login</NavButton>
      <NavButton color="inherit">Sign Up</NavButton>
      </LinkSection>
    
      </StyledNavbar>
    </AppBar>
  );
};
export default Navbar;
