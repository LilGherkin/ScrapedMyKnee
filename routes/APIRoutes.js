//Dependencies
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const reddit = "https://www.reddit.com/r/worldnews";

module.exports = app => {
    app.get("/scrape", (req, res) => {
        axios.get(reddit).then(response => {
            var $ = cheerio.load(response.data);
            var results = [];
            var holder = [];
            $("div.Post").each(function (i, element) {
                let title = $(element).children().find("h3").text();
                let postId = $(element).attr("id");
                let link = $(element).find("div." + postId).children().find("a").attr("href");
                result = {
                    title: title,
                    link: link,
                    redditId: postId
                }
                results.push(result);
            });
            db.Article.find({}, (err, data) => {
                if (err) throw err;
                holder = data;
                let i = 0;
                for (let j = 0; j < results.length; j++) {
                    const articleExists = holder.find(art => art.redditId === results[j].redditId);
                    if (!articleExists) db.Article.create(results[j], (err, data) => {
                        if (err) throw err;
                        // console.log(data);
                        i++;
                    })
                };
            }).then(db.Article.find({}, (err, data) => {
                if (err) throw err;
                res.json(data);
            })
            );
        });
    });
};
