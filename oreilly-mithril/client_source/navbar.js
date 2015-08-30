var m = require("mithril");

var NavBar = {
  view: function(ctrl, args) {
    var activeUrl = m.route();

    return  m(".container", [
        m(".navbar-header", [
          m("button.navbar-toggle.collapsed[aria-controls='navbar'][aria-expanded='false'][data-target='#navbar'][data-toggle='collapse'][type='button']", [
            m("span.sr-only", "Toggle navigation"),
            m("span.icon-bar"),
            m("span.icon-bar"),
            m("span.icon-bar")
          ]),
          m("a.navbar-brand", {href: "#", config: m.route}, args.title)
        ]),
        m(".collapse.navbar-collapse[id='navbar']", [
          m("ul.nav.navbar-nav", [
            m("li", {class: args.root === activeUrl ? "active" : ""}, [
              m("a", {href: args.root, config: m.route}, args.pages[args.root])
            ]),
            m("li", [m("a[href='#about']", "About")]),
            m("li", [m("a[href='#contact']", "Contact")])
          ])
        ])
    ])
  }
};

module.exports = NavBar;
