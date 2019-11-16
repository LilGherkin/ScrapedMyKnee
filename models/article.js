//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Saver
let ArticleSchema = new Schema({
    // Title is required and of type String
    title: {
      type: String,
      required: true
    },
    // Link is required, and is a string
    link: {
        type: String,
        required: true
    },
    redditID: {
        type: String,
        required: true
    }
});
  
// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);
  
// Export the Article model
module.exports = Article;