const reddit = "https://www.reddit.com";

//When the scrape button is clicked, scrape reddit.com/r/worldnews
$(document).on("click", ".ScrapeButton", () => {
    $.get("/scrape", data => {
        $(".go").remove();
        dump(data);
    });
});

//Create a card for each Scab we get from scraping. 
function Cards(Scabs) {
    for (let i = 0; i < Scabs.length; i++) {
        let Thread = {
            title: "",
            link: "",
            id: ""
        };
        Thread.title = Scabs[i].title;
        Thread.link = reddit + Scabs[i].link;
        Thread.id = Scabs[i].redditId
        //Creates the card
        $(".row").after(
            `<div class="col s12 m6">\
                <div class="card red-grey darken-1">\
                    <div class="card-content white-text">\
                        <span class="card-title">'+ Thread.title + '</span>\
                        <p>' + Thread.title + '</p>\
                    </div>\
                    <div class="card-action">\
                        <a href="' + Thread.link + '">See the comments on Reddit</a>\
                    </div>\
                </div >\
            </div > `);
    }
}