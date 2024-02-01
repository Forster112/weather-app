const path = require("path");
const express = require("express");
const hbs = require("hbs");
const process = require("process")

const forcast = require("./utils/forecast")

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(
  __dirname,
  "../templates/views"
);
const partialsPath = path.join(
  __dirname,
  "../templates/partials"
);

const PORT = process.env.PORT || 3000

// Setting handle bars for dynamic pages
// IMPORTANT: the 'view engine' and 'hbs fixed convention meaning it must be done that way for setting up handlebars view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

// This help configure what the server should
// when someone tries to get the resources from a particular url or route
// maybe we should be sending a html or sending back JSON
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Forster Michael",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Forster Udemezue",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Forster Udemezue",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address"
    })
  }

  forcast(req.query.address, (error, response, body) => {
    if (error) {
      res.render("404", {
        title: "404",
        name: "Forster Udemezue",
        errorMessage: error,
      });
    } else if (body.error) {
      res.render("404", {
        title: "404",
        name: "Forster Udemezue",
        errorMessage:
          error,
      });
    } else {
      res.send({
        location: `${body.location.region} ${body.location.country}`,
        forcast: `It is ${body.current.condition.text} with temperature of ${body.current.temp_f}`,
      });
    }
  });
});

app.get('/products', (req, res) => {
  // query strings are like the arguments a client needs when making a request e.g get a user by id
  // the req.query is an object with all queries by
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })
  }

  res.send({
    products: []
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Forster Udemezue",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Forster Udemezue",
    errorMessage: "Page not found please use a valid url",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});

module.exports = app

// NOTE:
// 1. Your handlebars must be in a directory called views
