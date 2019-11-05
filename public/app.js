function DisplayArticles(articles) {
    //Dump the table
    $("tbody").empty();

//For each entry in our database...
    articles.forEach(function(article) {
        //Append each of the articles properties to the table.
        var tr = $("<tr>").append(
            $("<td>").text(article.headline),
            $("<td>").text(article.summary),
            $("<td>").text(article.URL)
        );
        $("tbody").append(tr);
    });
}
