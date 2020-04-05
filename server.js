const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const db = require("./db");
const movieRouter = require("./routes/movie-router");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api", movieRouter);

// server static assets if in production
// if (process.env.NODE_ENV === "production") {
if (true) {
  //  set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const apiPort = process.env.PORT;
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
