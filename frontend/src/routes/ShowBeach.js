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
  margin: 20px 0;
`;

const Description = styled.div`
  border-radius: 0 0 20px 20px;
  border: 1px solid #a9a9a9;
  color: #808080;
  font-style: italic;
  margin-top: 20px;
  padding: 16px;
`;

const EditButton = styled(Button)`
  && {
    background-color: #006994;
    color: white;
    :hover {
      background-color: #0a4861;
    }
  }
`;

const CancelButton = styled(Button)`
  && {
    background-color: #e33430;
    color: white;
    :hover {
      background-color: #d41a16;
    }
  }
`;

const StyledImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  border-radius: 10px 10px 0 0;
  margin-top: 20px;
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

  console.log(beach);
  return (
    <div>
      {beach && (
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{beach.title}</Typography>
            <Typography variant="h5">{beach.location}</Typography>
            <StyledImage
              className="media"
              image={beach.imageUrl}
              title="Dummy title"
              onClick={() => console.log("clicked")}
            />
            {beach.description && (
              <Description>
                <p>{beach.description}</p>
              </Description>
            )}
            <ButtonContainer>
              <EditButton onClick={() => history.push(`/beaches/${id}/edit`)}>
                Edit
              </EditButton>
              <CancelButton onClick={handleDelete}>Delete</CancelButton>
            </ButtonContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ShowBeach;
