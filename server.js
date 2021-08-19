const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.use(
  history({
    index: path.join(__dirname, "dist") + "/index.html",
    verbose: true,
    disableDotRule: true,
  })
);

app.use(serveStatic(path.join(__dirname, "dist")));

app.listen(port);
