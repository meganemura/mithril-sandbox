var m = require("mithril");

var buttonModule = {
  controller: function() {},
  view: function() {
    return m(".container.theme-showcase", [
        m(".jumbotron", [
          m("h1", "Button example"),
          m("p", "This is a template showcasing...")
        ])
    ]);
  }
};

module.exports = buttonModule;
