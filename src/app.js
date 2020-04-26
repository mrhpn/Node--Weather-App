const path = require("path");
const url = require("url");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Paths to static assets and templates folder
const publicDirectoryPath = `${__dirname}/../public`;
const viewsPath = `${__dirname}/../templates/views`;
const partialsPath = `${__dirname}/../templates/partials`;

// Setting up handlebars template engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serving up static files
app.use(express.static(publicDirectoryPath));

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    about: url.parse(req.url, true).path.includes("about") ? "active" : "",
    footerTitle: "Developed by HPN",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: url.parse(req.url, true).path.includes("help") ? "active" : "",
    footerTitle: "Developed by HPN",
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    home: "active",
    footerTitle: "Developed by HPN",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000  . . .");
});
