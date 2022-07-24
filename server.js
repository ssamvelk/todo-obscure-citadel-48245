const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());
// app.use(requireHTTPS);
app.use(express.static("./dist/todo"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "./dist/todo" });
});

app.listen(port, () => console.log(`Server is running on ${port}`));

// ----------------------

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
