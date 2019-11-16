// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// Establish where to get stuff from. 
const routes = require("./controller/scraper");

//Set the port to whatever the server is using or localhost 3000.
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsCrepe";
const app = express();

//Middleware to make handlebars function
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//For heroku. 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Listen on port 3000
app.listen(3300, function() {
  console.log("App running on port 3300!");
});
