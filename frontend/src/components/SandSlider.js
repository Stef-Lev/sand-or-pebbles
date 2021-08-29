import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { theme } from '../helpers/theme';

const grainScale = [
    {
        url: '/assets/sand-fine.png',
        label: 'Fine sand'
    },
    {
        url: '/assets/sand-medium.png',
        label: 'Medium sand'
    },
    {
        url: '/assets/sand-granules.png',
        label: 'Granules'
    },
    {
        url: '/assets/sand-mixed.png',
        label: 'Mixed'
    },
    {
        url: '/assets/sand-pebbles.png',
        label: 'Pebbles'
    },
    {
        url: '/assets/sand-cobbles.png',
        label: 'Cobbles'
    }
];

const StyledSlider = styled(Slider)`
    && {
        color: ${theme.primaryColor};
        font-size: 16px;
    }
    .MuiSlider-markLabelActive {
        color: ${theme.primaryColor};
    }
`;
const MainContainer = styled.div`
   padding: 16px;
   margin-bottom: 16px;
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

const SandSlider = (props) => {

    const [value, setValue] = React.useState(3);
    const [image, setImage] = useState(props.current ? grainScale[props.current - 1] : grainScale[value - 1]);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setImage(grainScale[value - 1]);
    };

    useEffect(() => {
        console.log(value);
        console.log(image);
    }, [value])


    // @TODO: import images for each mark
    return (
        <MainContainer>
            <ImageContainer>
                <Image src={image.url} />
                <Typography>
                    {image.label}
                </Typography>
            </ImageContainer>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography>
                        Sand
                    </Typography>
                </Grid>
                <Grid item xs>
                    <StyledSlider
                        value={value}
                        onChange={handleSliderChange}
                        step={1}
                        marks
                        min={1}
                        max={6}
                    />
                </Grid>
                <Grid item>
                    <Typography>
                        Pebbles
                    </Typography>
                </Grid>
            </Grid>
        </MainContainer>
    )
}

export default SandSlider
