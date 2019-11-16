//Dependencies
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();

//Scrape request for NYTimes.
router.get("/api/scrape", (req, res) => {
    axios.get("https://www.nytimes.com").then(response => {
        const $ = cheerio.load(response.data);
        const results = [];
        $(".balancedHeadline").each(function (i, element) {
            const result = {};
            result.title = $(this).children("a").text();
            result.url = $(this).children("a").attr("href");

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));

            results.push({ result });
        });
        console.log(results);
        res.send(results);
    }).catch(err => console.log(err));
});

//By default, pull up all the articles. 
router.get("/", (req, res) => {
    db.Article.find({})
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            };
            console.log("--------------------------------------")
            // console.log(hbsObject);
            res.render("home", hbsObject);
        })
        .catch(err => res.json(err));
});

module.exports = router;