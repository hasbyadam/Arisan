module.exports = function (app) {
    require("./config")();
    require("./cors")(app)
    require("./parser")(app);
    require("./passport")(app)
    require("./db")();
    require("./routes")(app);
  };