// require necessary packages/folders
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// current working directory
const cwd = process.cwd();

// assign port
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for social running on port ${PORT}!`);
  });
});
