var m = require("mithril");

// Model: Todo
var Todo = function(data) {
  this.description = m.prop(data && data.description || "");
  this.done = m.prop(false);
};

Todo.list = function() {
  return m.request({method: "GET", url: "/tasks", type: Todo});
};

Todo.save = function(todoList) {
  return m.request({method: "POST", url: "/tasks", data: data});
};

module.exports = Todo;
