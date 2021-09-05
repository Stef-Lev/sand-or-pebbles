import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { theme } from "../helpers/theme";
import { useField } from "formik";

const grainScale = [
  {
    url: "/assets/sand-fine.png",
    label: "Fine sand",
  },
  {
    url: "/assets/sand-medium.png",
    label: "Medium sand",
  },
  {
    url: "/assets/sand-granules.png",
    label: "Granules",
  },
  {
    url: "/assets/sand-mixed.png",
    label: "Mixed",
  },
  {
    url: "/assets/sand-pebbles.png",
    label: "Pebbles",
  },
  {
    url: "/assets/sand-cobbles.png",
    label: "Cobbles",
  },
];

const StyledSlider = styled(Slider)`
  && {
    color: ${theme.primaryColor};
    font-size: 16px;
    padding: 0;
  }
  .MuiSlider-markLabelActive {
    color: ${theme.primaryColor};
  }
`;
const MainContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.23);
`;

const Title = styled.p`
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  color: ${theme.primaryColor};
  font-style: italic;
`;

const Image = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SliderInput = (props) => {
  const [inputValue, setInputValue] = React.useState(props.defaultValue);
  const [image, setImage] = useState(
    props.current ? grainScale[props.current - 1] : grainScale[inputValue - 1]
  );

  const handleSliderChange = (
    event,
    newValue,
    formikFn = props.onFormChange
  ) => {
    setInputValue(newValue);
    setImage(grainScale[inputValue - 1]);
    formikFn("sandQuality", newValue);
  };

  useEffect(() => {
    console.log("FINAL VALUE===>", inputValue);
    console.log(image);
  }, [inputValue]);

  return (
    <MainContainer>
      <Title>Beach type</Title>
      <ImageContainer>
        <Image src={image.url} />
        <Typography>{image.label}</Typography>
      </ImageContainer>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Sand</Typography>
        </Grid>
        <Grid item xs>
          <StyledSlider
            name="sandQuality"
            value={inputValue}
            onChange={handleSliderChange}
            step={1}
            marks
            min={1}
            max={6}
          />
        </Grid>
        <Grid item>
          <Typography>Pebbles</Typography>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default SliderInput;
