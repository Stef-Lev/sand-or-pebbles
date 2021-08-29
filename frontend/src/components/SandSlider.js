import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { theme } from '../helpers/theme';

const grainScale = [
    {
        url: 'https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg',
        label: 'Fine sand'
    },
    {
        url: 'https://previews.123rf.com/images/farang/farang1303/farang130300002/18239754-tropical-beach-square-composition.jpg',
        label: 'Sand'
    },
    {
        url: 'https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg',
        label: 'Medium sand'
    },
    {
        url: 'https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg',
        label: 'Pebbles'
    },
    {
        url: 'https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg',
        label: 'Huge pebbles'
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

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
`;

const SandSlider = () => {

    const [value, setValue] = React.useState(3);
    const [image, setImage] = useState(grainScale[value - 1]);

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
        <div>
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
                        max={5}
                    />
                </Grid>
                <Grid item>
                    <Typography>
                        Pebbles
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default SandSlider
