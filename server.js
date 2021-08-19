const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const port = process.env.PORT || 3000;
const staticMiddleware = serveStatic(path.join(__dirname, "dist"), {
  dotfiles: "allow",
});

const app = express();

app.use(staticMiddleware);
app.use(
  history({
    disableDotRule: true,
  })
);
app.use(staticMiddleware);

/*
app.get("/", function (req, res) {
  res.render(path.join(__dirname + "dist/index.html"));
});
*/

app.listen(port);
