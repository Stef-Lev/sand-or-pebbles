import React from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";

const BtnContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const StyledIconButton = styled(IconButton)`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.$backgroundColor}!important;
  color: ${(props) => props.$color}!important;
  transition: all 250ms ease-in-out;
  :hover {
    background-color: ${(props) => props.$hoverColor}!important;
    transition: all 250ms ease-in-out;
  }
`;

const IconBtn = ({
  children,
  opacity,
  backgroundColor,
  color,
  hoverColor,
  onClick,
}) => {
  return (
    <BtnContainer>
      <StyledIconButton
        onClick={onClick}
        $backgroundColor={backgroundColor}
        $color={color}
        $hoverColor={hoverColor}
      >
        {children}
      </StyledIconButton>
    </BtnContainer>
  );
};

export default IconBtn;
