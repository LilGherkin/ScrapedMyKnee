//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");

//Express to handle handlebars stuff
const app = express();
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Handle API routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

//Set the port. 
let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wonderfuldb";

//Connect to a database. 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//Tell us what PORT we're on. 
app.listen(PORT, () => console.log("Listening on PORT: " + PORT));