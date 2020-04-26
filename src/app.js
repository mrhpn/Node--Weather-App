const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/about", (req, res) => {
  console.log(req.query);
  res.render("about", {
    title: "About",
    about: req.path.includes("about") ? "active" : "",
    footerTitle: "Developed by HPN",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: req.path.includes("help") ? "active" : "",
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
