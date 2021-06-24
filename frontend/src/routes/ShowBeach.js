import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getOneMethod, deleteMethod } from "../helpers/services";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin: 20px 0;;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #006994;
    color: white;
    :hover {
      background-color: #0a4861;
    }
  }
`;

const StyledImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
`;

function ShowBeach() {
  const { id } = useParams();
  const history = useHistory();

  const [beach, setBeach] = useState(null);

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((beach) => setBeach(beach))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
    deleteMethod("http://localhost:7002/beaches/", id).then((res) => {
      console.log(res);
      history.push("/beaches");
    });
  };

  return (
    <div>
      {beach && (
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Typography variant='h3'>{beach.title}</Typography>
            <StyledImage
              className="media"
              image="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
              title="Dummy title"
              onClick={() => console.log("clicked")}
            />
            <ButtonContainer>
            <StyledButton onClick={() => history.push(`/beaches/${id}/edit`)}>
                Edit
              </StyledButton>
              <StyledButton onClick={handleDelete}>
                Delete
              </StyledButton>
            </ButtonContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ShowBeach;
