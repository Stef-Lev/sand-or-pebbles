import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const StyledCard = styled(Card)`
  width: 360px;
  height: 400px;

  .media {
    height: 0;
    padding-top: 56.25%;
  }
`;

function BeachCard({ title, location, description, imageUrl, onClick }) {
  const image =
    imageUrl ||
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";

  return (
    <StyledCard>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ variant: "h6" }}
        subheader={location}
      />
      <CardMedia
        className="media"
        image={image}
        title={title}
        onClick={onClick}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}

export default BeachCard;
