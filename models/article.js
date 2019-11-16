//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Save the article to the database with a title and a url. 
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

//For future reference.
const Article = mongoose.model("article", ArticleSchema);

//Export it.
module.exports = Article;