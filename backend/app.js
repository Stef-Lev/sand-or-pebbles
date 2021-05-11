const express = require("express");
const app = express();
const PORT = 7002;

app.get("/", (req, res) => {
  res.send(`PORT ${PORT} listening...`)
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
