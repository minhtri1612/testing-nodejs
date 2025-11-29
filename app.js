const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const e = require("express");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();


app.use(express.json());

app.use("/todos", todoRoutes);
app.get("/", (req, res) => {
  res.json("Hello world!");
});



module.exports = app;