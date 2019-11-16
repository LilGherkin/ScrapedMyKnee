//Dependencies
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const reddit = "https://www.reddit.com/r/worldnews";


//I broke something in the section below, but I'm not sure what.

//Exports it for use of server.js
module.exports = app => {
    //Calls the scrape.
    app.get("/scrape", (req, res) => {
        //gets it from reddit which we've defined above as the worldnews subreddit
        axios.get(reddit).then(response => {
            var $ = cheerio.load(response.data);
            var results = [];
            var holder = [];
            //For each <div.Post> on reddit, do the following
            $("div.Post").each(function (i, element) {
                //Set the title equal to how reddit defines it.
                let title = $(element).children().find("h3").text();
                //Set the redditId equal to the appropriate tag. 
                let redditId = $(element).attr("id");
                //Set the link equal to the a href of the post. 
                let link = $(element).find("div." + postId).children().find("a").attr("href");
                //Stash them in a result array with the 3 elements above.
                result = {
                    title: title,
                    link: link,
                    redditId: postId
                }
                //Push the result to our results array.
                results.push(result);
            });
            //I'm pretty sure this is where it's broken. "Cannot read find of undefined. But Article exists."
            //We do a query on mongodb with our database and set it find everything lodged in it for now.
            db.Article.find({}, (err, data) => {
                if (err) throw err;
                //We need a holder for simplicity sake
                holder = data;
                let i = 0;
                //Run over our results array and if it exists throw it into our array.
                for (let j = 0; j < results.length; j++) {
                    const articleExists = holder.find(thing => thing.redditId === results[j].redditId);
                    if (!articleExists) db.Article.create(results[j], (err, data) => {
                        if (err) throw err;
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
