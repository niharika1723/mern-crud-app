const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const keys = require("./config/keys");
const cors = require("cors");

//Create connection to mongodb
mongoose.connect(keys.mongo_uri);

const app = express();

app.use(bodyparser.json());

app.use(cors());

app.use("/posts", require("./routes/post"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send({ Project: "CRUD APP" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
