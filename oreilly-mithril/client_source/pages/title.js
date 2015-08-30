var m = require("mithril");

var titleModule = {
  controller: function() {},
  view: function() {
    return m(".container.theme-showcase", [
        m(".jumbotron", [
          m("h1", "Theme example"),
          m("p", "This is a template showcasing...")
        ])
    ]);
  }
};

module.exports = HomePage;
