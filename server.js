const express = require("express");
//const path = require("path");
//const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  history({
    verbose: true,
    disableDotRule: true,
  })
);

app.use(express.static(__dirname + "/dist"));

app.listen(port);
