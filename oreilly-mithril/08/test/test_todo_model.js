var Todo = require("../client_source/todo_model");
var assert = require("power-assert");

describe("myTodo", function() {
  it("can create instance without option", function() {
    var todo = new Todo();
    assert(todo.description() === "");
    assert(todo.done() === false);
  });

  it("can create instance with initial values", function() {
    var todo = new Todo({description: "buy milk"});
    assert(todo.description() === "buy milk");
    assert(todo.done() === false);
  });
});
