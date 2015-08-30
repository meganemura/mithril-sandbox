var m = require("mithril");

// Model: Todo
var Todo = function(data) {
  this.description = m.prop(data && data.description || "");
  this.done = m.prop(false);
};

module.exports = Todo;
