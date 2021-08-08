import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const ScrollIconContainer = styled.div`
    opacity: ${props => props.opacity};
    position: fixed;
    bottom: 20px;
    right: 20px;
`;

function ScrollTop({ clickAction, opacity }) {
    return (
        <ScrollIconContainer opacity={opacity}>
            <IconButton aria-label="scrollTop" onClick={clickAction}>
                <ArrowUpwardIcon />
            </IconButton>
        </ScrollIconContainer>
    )
}

export default ScrollTop
