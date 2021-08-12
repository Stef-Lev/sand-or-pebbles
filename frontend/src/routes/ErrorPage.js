import React from "react";
import styled from "styled-components";
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

function ErrorPage({ status, error }) {
    return (
        <Paper elevation={3}>
            <Container>
                <ErrorContainer>
                    <ErrorIcon />
                    <Typography variant="h1" style={{ fontSize: "3rem" }}>
                        {status}
                    </Typography>
                    <Typography variant="h2" style={{ fontSize: "2.5rem" }}>
                        {error}
                    </Typography>
                </ErrorContainer>
            </Container>
        </Paper>
    );
}

export default ErrorPage;