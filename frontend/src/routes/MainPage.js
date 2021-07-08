import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAllMethod } from "../helpers/services";
import { Grid, Paper } from "@material-ui/core";
import BeachCard from "../components/BeachCard";
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  .MuiCircularProgress-root {
    width: 100px!important;
    height: 100px!important;
    color: #006994;
  }
`;

function MainPage() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getAllMethod("http://localhost:7002/beaches")
      .then((beaches) => {
        setData(beaches);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToBeach = (id) => {
    history.push(`/beaches/${id}`);
  };

  console.log(data);
  
  if (loading) {
    return <StyledLoader>
      <CircularProgress/>
    </StyledLoader>
  }

  return (
    <div className="App">
      <h1>All Beaches</h1>
      <div>
        <button onClick={() => history.push("/beaches/new")}>New beach</button>
      </div>
      <section style={{ margin: 0, padding: "8px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {data &&
                data.map((item, index) => {
                  return (
                    <Grid key={index} item>
                      <Paper elevation={3}>
                        <BeachCard
                          title={item.title}
                          location={item.location}
                          imageUrl={item.imageUrl}
                          description={item.description}
                          onClick={() => goToBeach(item._id)}
                        />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}

export default MainPage;
