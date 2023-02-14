// require necessary packages/folders
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// current working directory
const cwd = process.cwd();

// assign port
const PORT = process.env.PORT || 3001;
const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes("social-network-api")
//   ? cwd.split("/social-network-api/")[1]
//   : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for social running on port ${PORT}!`);
  });
});
// const cwd = process.cwd();
