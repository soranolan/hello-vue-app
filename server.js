const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();
const middleware = serveStatic(path.join(__dirname, "dist"));

app.use(history());
app.use(middleware);

app.listen(port);
