const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
//const history = require("connect-history-api-fallback");
const port = process.env.PORT || 3000;

const app = express();
/*
app.use(
  history({
    verbose: true,
    disableDotRule: true,
  })
);
*/
app.use(serveStatic(path.join(__dirname, "dist"), { dotfiles: "allow" }));
app.listen(port);
