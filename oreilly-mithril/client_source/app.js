var m = require("mithril");

var NavBar = require("./navbar");
var title = require("./pages/title");

m.mount(document.getElementById("navbar"),
  m.component(NavBar, {
    title: "Sample List",
    root: "/title",
    pages: {
      "/title": "Bootstrap sample",
      "/buttons": "Buttons",
      "/tables": "Tables",
    }
  }));

m.route(document.getElementById("root"), "/title", {
  "/title": title
});
