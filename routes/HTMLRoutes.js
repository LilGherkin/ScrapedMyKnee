//For use of server.js
module.exports = app => {
    app.get("/", (req, res) => {
        res.render("index", {
            msg: "filler"
        });
    });
};