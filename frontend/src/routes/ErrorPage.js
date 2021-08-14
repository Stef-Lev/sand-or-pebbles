import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const Container = styled.div`
  margin: 16px auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ErrorIcon = styled(SentimentVeryDissatisfiedIcon)`
  width: 120px;
  height: 120px;
`;

function ErrorPage(props) {
    const { message, status } = useParams();
    return (
        <Paper elevation={3}>
            <Container>
                <ErrorContainer>
                    <ErrorIcon />
                    <Typography variant="h1" style={{ fontSize: "3rem" }}>
                        {props.status ? props.status : status}
                    </Typography>
                    <Typography variant="h2" style={{ fontSize: "2.5rem" }}>
                        {props.message ? props.message : message}
                    </Typography>
                </ErrorContainer>
            </Container>
        </Paper>
    );
}

export default ErrorPage;