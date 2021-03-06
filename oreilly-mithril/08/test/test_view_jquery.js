var jsdom = require('jsdom');
var render = require('mithril-node-render');
var assert = require("power-assert");
var MyTodoApp = require("../client_source/app");

jsdom.env('<html>', function(errors, window) {
  describe("MyTodoApp.view via DOM", function() {
    var $;
    beforeEach(function() {
      $ = require('jquery')(window);
    });
    it('has no items', function() {
      var controller = new MyTodoApp.controller(true);
      var view = render(MyTodoApp.view(controller));
      assert($('tr', view).length === 0);
    });
  });
});
