var NavBar = require("./navbar");

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
