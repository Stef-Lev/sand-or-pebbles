import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import styled from "styled-components";
import { getAllMethod } from "../helpers/services";
import { changeColorBrightness } from "../helpers/changeColorBrightness";
import { Grid, Paper } from "@material-ui/core";
import BeachCard from "../components/BeachCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { theme } from "../helpers/theme";
import IconBtn from "../components/IconBtn";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

function MainPage() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    getAllMethod("http://localhost:7002/beaches")
      .then((response) => {
        response.result === "success"
          ? setData(response.data)
          : history.push(`/error/${response.status || 500}/${response.type}`);
        setIsLoading(false);
      })
      .catch((err) => {
        history.push(`/error/${err.status || 500}/${err.message}`);
      });
  }, [history]);

  const goToBeach = (id) => {
    history.push(`/beaches/${id}`);
  };

  const scrollToTop = () => {
    let rootElement = document.documentElement;
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Check if fetches all data
    data.length > 0 && console.log(data);
  }, [data]);

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
        <IconBtn
          onClick={scrollToTop}
          backgroundColor={theme.primaryColor}
          hoverColor={changeColorBrightness(theme.primaryColor, -10)}
          color="#FFF"
        >
          <ArrowUpwardIcon />
        </IconBtn>
      </section>
    </div>
  );
}

export default MainPage;
