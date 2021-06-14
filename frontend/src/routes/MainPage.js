import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllMethod } from "../helpers/services";
import { Grid, Paper } from "@material-ui/core";
import BeachCard from "../components/BeachCard";

function MainPage() {
  const [data, setData] = useState("");

  const history = useHistory();

  useEffect(() => {
    getAllMethod("http://localhost:7002/beaches")
      .then((beaches) => setData(beaches))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>All Beaches</h1>
      <div>
        <button onClick={() => history.push("/beaches/new")}>New beach</button>
      </div>
      <section style={{margin: 0, padding:'8px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {data &&
                data.map((item, index) => {
                  return (
                    <Grid key={index} item>
                      <Paper elevation={3}>
                        <Link to={`/beaches/${item._id}`}>{item.title}</Link>
                        <BeachCard title={item.title} location={item.location}/>
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
