import React from 'react';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { theme } from '../helpers/theme';

const marks = [
    {
        url: 'https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg'
    },
    {
        url: 'https://previews.123rf.com/images/farang/farang1303/farang130300002/18239754-tropical-beach-square-composition.jpg'
    },
    {
        value: 3
    },
    {
        value: 4
    },
    {
        value: 5
    }
];

// Make images dynamic
const StyledSlider = styled(Slider)`
    && {
        color: ${theme.primaryColor};
        font-size: 16px;
    }
    .MuiSlider-markLabelActive {
        color: ${theme.primaryColor};
    }
`;

function SandSlider() {
    return (
        <div>
            <Typography id="discrete-slider" gutterBottom>
                Sand
            </Typography>
            <StyledSlider
                defaultValue={3}
                aria-labelledby="discrete-slider"
                step={1}
                marks
                min={1}
                max={5}
            />
        </div>
    )
}

export default SandSlider
