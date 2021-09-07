import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneMethod, deleteMethod, postMethod } from "../helpers/services";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Image } from "../components/SliderInput";
import { ImageContainer } from "../components/SliderInput";
import { grainScale } from "../components/SliderInput";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import { theme } from "../helpers/theme";
import { handleApiResponse as handleRes } from "../helpers/handleApiResponse";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const Description = styled.div`
  display: flex;
  width: 100%;
  color: #808080;
  font-style: italic;
  margin-top: 20px;

  p::nth-child(2) {
    margin-right: 16px;
    width: 80%;
  }
  div {
    width: 20%;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const ReviewTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${theme.primaryColor};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${theme.primaryColor};
    }
  }
`;

const EditButton = styled(Button)`
  && {
    background-color: ${theme.primaryColor};
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

const SubmitReviewButton = styled(Button)`
  && {
    background-color: ${theme.secondaryColor};
    color: white;
    :hover {
      background-color: #a87a4d;
    }
  }
`;

const StyledImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  border-radius: 6px;
  margin-top: 20px;
`;

function ShowBeach() {
  const { id } = useParams();
  const history = useHistory();

  const [beach, setBeach] = useState(null);
  const [review, setReview] = useState({ rating: 2, text: "" });

  useEffect(() => {
    getOneMethod("http://localhost:7002/beaches/", id)
      .then((response) => {
        response.result === "success"
          ? setBeach(response.data)
          : history.push(`/error/${response.status}/${response.type}`);
      })
      .catch((err) => {
        history.push(`/error/${err.status}/${err.message}`);
      });
  }, [id, history]);

  const handleDelete = () => {
    deleteMethod("http://localhost:7002/beaches/", id).then((res) => {
      console.log(res);
      history.push("/beaches");
    });
  };

  const handleReviewSubmit = () => {
    console.log("Submitted");
    postMethod(`http://localhost:7002/beaches/${id}/reviews`, review)
      .then((response) => {
        handleRes(
          response,
          () => {
            console.log("SUCCESS!!!");
            history.push(`/beaches/${id}`);
          },
          () => console.log("Open Modal")
        );
      })
      .catch((err) => console.log("ERROR,ERROR!", err));
  };

  beach && console.log(beach);

  return (
    <div>
      {beach && (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3">{beach.title}</Typography>
            <Typography variant="h5">{beach.location}</Typography>
            <StyledImage
              className="media"
              image={
                beach.imageUrl ||
                "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
              }
              title={beach.title}
              onClick={() => console.log("clicked")}
            />
            <Description>
              <p>{beach.description}</p>
              <ImageContainer>
                <Image src={grainScale[beach.sandQuality - 1].url} />
                <Typography>
                  {grainScale[beach.sandQuality - 1].label}
                </Typography>
              </ImageContainer>
            </Description>
            <ButtonContainer>
              <EditButton onClick={() => history.push(`/beaches/${id}/edit`)}>
                Edit
              </EditButton>
              <CancelButton onClick={handleDelete}>Delete</CancelButton>
            </ButtonContainer>
            <ReviewContainer>
              <Typography variant="h5">Leave a Review</Typography>
              <Typography>Rating</Typography>
              <Rating
                name="simple-controlled"
                value={review.rating}
                onChange={(event, newValue) => {
                  setReview((prev) => ({ ...prev, rating: newValue }));
                }}
              />
              <Typography>Review</Typography>
              <ReviewTextField
                multiline
                minRows={5}
                maxRows={10}
                variant="outlined"
                onChange={(event) => {
                  setReview((prev) => ({ ...prev, text: event.target.value }));
                }}
              />
              <div>
                <SubmitReviewButton onClick={handleReviewSubmit}>
                  Submit
                </SubmitReviewButton>
              </div>
            </ReviewContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ShowBeach;
