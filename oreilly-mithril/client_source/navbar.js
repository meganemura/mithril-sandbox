var m = require("mithril");

var NavBar = {
  view: function(ctrl, args) {
    return  m(".container", [
        m(".navbar-header", [
          m("button.navbar-toggle.collapsed[aria-controls='navbar'][aria-expanded='false'][data-target='#navbar'][data-toggle='collapse'][type='button']", [
            m("span.sr-only", "Toggle navigation"),
            m("span.icon-bar"),
            m("span.icon-bar"),
            m("span.icon-bar")
          ]),
          m("a.navbar-brand[href='#']", "Project name")
        ]),
        m(".collapse.navbar-collapse[id='navbar']", [
          m("ul.nav.navbar-nav", [
            m("li.active", [m("a[href='#']", "Home")]),
            m("li", [m("a[href='#about']", "About")]),
            m("li", [m("a[href='#contact']", "Contact")])
          ])
        ])
    ])
  }
};

module.exports = NavBar;
