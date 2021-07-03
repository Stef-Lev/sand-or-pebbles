import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuItem } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const headerData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Beaches",
    href: "/beaches",
  },
  {
    label: "New Beach",
    href: "/beaches/new",
  },
];

const StyledAppBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #006994 !important;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 60vw;
  }
`;

const Header = () => {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 800
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const getDrawerChoices = () => {
    return headerData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
            onClick: () =>
              mobileView &&
              setState((prevState) => ({ ...prevState, drawerOpen: false })),
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <StyledDrawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </StyledDrawer>
        <div>
          <Typography variant="h5">BeachFinder</Typography>
        </div>
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <Typography variant="h5">BeachFinder</Typography>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <StyledAppBar position="sticky">
      {mobileView ? displayMobile() : displayDesktop()}
      {/* <LinkSection>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h5">BeachFinder</Typography>
      <Typography variant="body1">Beaches</Typography>
      <Typography variant="body1">About</Typography>
      <Typography variant="body1">New</Typography>
      </LinkSection>
      <LinkSection>
      <NavLink color="inherit">Login</NavLink>
      <NavLink color="inherit">Sign Up</NavLink>
      </LinkSection>
     */}
    </StyledAppBar>
  );
};
export default Header;
