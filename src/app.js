const path = require("path");
const express = require("express");

const app = express();

// Setting up handlebars template engine
app.set("view engine", "hbs");

// Serving up static files
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000  . . .");
});
