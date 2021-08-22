import React from 'react';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
.MuiSlider-mark {
    width: 40px;
    height: 40px;
    background: url('https://thumbs.dreamstime.com/z/seamless-sand-light-beach-square-texture-39124846.jpg');
    position: absolute;
    top: 50%;
    right 50%;
    transform: translate(-50%,-50%);
    border: 1px solid black;
    border-radius: 50%;
}
`;

function SandSlider() {
    return (
        <div style={{ padding: '20px 44px' }}>
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
