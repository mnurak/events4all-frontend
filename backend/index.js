const express = require("express");
const cors = require("cors");
const connectToMongo = require('./dbs')

const app = express();
const port = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(port, () =>
  console.log(`Example app is listening on port ${port}.`)
);