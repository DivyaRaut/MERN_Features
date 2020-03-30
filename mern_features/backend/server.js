const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

// Adding a middleware:
// ######################################################################
// Having done all these, what happens if we entered a wrong route? say you entered 'http://localhost:3000/task', It responds with a message “Cannot GET /task”. Let’s add express middleware which could be used to return more interactive messages.
// Middlewares basically intercepts incoming http request and as such you can use them to perform several operations ranging from authentication to validations etc.
// To do this, open your server.js file and paste the code snippet into it.
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
// ######################################################################

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
