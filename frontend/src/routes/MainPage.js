import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAllMethod } from "../helpers/services";
import { Grid, Paper } from "@material-ui/core";
import BeachCard from "../components/BeachCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { theme } from "../helpers/theme";
import ScrollTop from '../components/ScrollTop';

function MainPage() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    getAllMethod("http://localhost:7002/beaches")
      .then((beaches) => {
        setData(beaches);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToBeach = (id) => {
    history.push(`/beaches/${id}`);
  };

  console.log(data);

  return (
    <div className="App">
      <h1>All Beaches</h1>
      <section style={{ margin: 0, padding: "8px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              {isLoading && !data && (
                <CircularProgress
                  size="140px"
                  style={{
                    color: theme.primaryColor,
                    margin: "36px",
                  }}
                />
              )}
              {!isLoading &&
                data &&
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
        <ScrollTop clickAction={() => {
          console.log('Scrolling');
        }
        } />
      </section>
    </div>
  );
}

export default MainPage;
