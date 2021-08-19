const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.use(serveStatic(path.join(__dirname, "/dist")));
app.use(history());
app.use(serveStatic(path.join(__dirname, "/dist")));

app.get("/", function (req, res) {
  res.render(path.join(__dirname + "/dist/index.html"));
});

app.listen(port);
