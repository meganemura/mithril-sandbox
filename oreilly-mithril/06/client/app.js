// 6.6.4
// Model Class
var WikiPage = function(data, IsInitial) {
  this.source = m.prop(data.source);
  this.pageTitles = m.prop(data.pageTitles);
}

// Load page from server
WikiPage.read = function(pageName) {
  return m.request({method: "GET", url: "/api/" + pageName, type: WikiPage});
};

// Save page to server
WikiPage.save = function(pageName, source) {
  m.request({method: "POST", url: "/api/" + pageName, data: {source: source}});
};

// Is pageName contained in pageTitles?
WikiPage.prototype.contains = function(pageName) {
  return this.pageTitles().indexOf(pageName) !== -1;
};

// Regexp for parsing text
var LinkPattern = /((?:(?:mailto|http|https|ftp):[\x21-\x7E*)|(?:[A-Z][a-z]+(?:[A-Z][a-z]+)+))/mg;
var WikiName = /([A-Z][a-z]+(?:[A-Z][a-z]+)+)/;

// Token types
var PlainTextType = 1;
var LinkType      = 2;
var WikiNameType  = 3;

// Divide wiki source into links and other text
WikiPage.tokenize = function(sourceText) {
  return sourceText.split(LinkPattern).map(function(fragment) {
    if (LinkPattern.test(fragment)) {
      if (WikiName.test(fragment)) {
        return {type: WikiNameType, text: fragment};
      } else {
        return {type: LinkType, text: fragment};
      }
    } else {
      return {type: PlainTextType, text: fragment};
    }
  });
};

// ViewModel
var vm = {
  page: null,
  edit: null,
  // for readonly
  read: function(pageName) {
    vm.page = WikiPage.read(pageName);
  },
  // for edit
  startEdit: function() {
    vm.edit = m.prop(vm.page().source());
  },
  save: function(pageName) {
    WikiPage.save(pageName, vm.edit());
    vm.page().source(vm.edit());
  }
};

// Component for viewing page
var ViewPage = {
  controller: function() {
    var self = this;
    this.pageName = m.route.param("pagename");
    this.edit = function() {
      m.route("/" + self.pageName + "/edit");
    };
    vm.read(this.pageName);
  },
  view: function(ctrl) {
    return m("div", [
        m("h1", this.pageName),
        m("pre", WikiPage.tokenize(vm.page().source()).map(function(token) {
          switch (token.type) {
            case PlainTextType:
              return token.text;
            case LinkType:
              return m("a", {href: token.text}, token.text);
            case WikiNameType:
              if (vm.page().contains(token.text)) {
                return m("a", {href: "/" + token.text, config: m.route}, token.text);
              } else {
                return m("a", {href: "/" + token.text, config: m.route}, token.text + "?");
              }
          }
        })),
        m("button", {onclick: ctrl.edit}, "Edit")
    ]);
  }
};

m.route.mode = "pathname";
m.route(document.getElementById("root"), "/FrontPage", {
  "/:pagename": ViewPage,
  "/:pagename/edit": EditPage
});
