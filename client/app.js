var myApplication = {               // (1)
  controller: function() {},        // (2)
  view: function(controller) {      // (3)
    return m("h1", "hello world");  // (4)
  }
};

m.mount(document.getElementById("root"), myApplication);  // (5)
