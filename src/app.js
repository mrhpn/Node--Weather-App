const path = require("path");
const express = require("express");

const app = express();

// Paths to static assets and templates folder
const publicDirectoryPath = `${__dirname}/../public`;
const viewsPath = `${__dirname}/../templates`;

// Setting up handlebars template engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Serving up static files
app.use(express.static(publicDirectoryPath));

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
