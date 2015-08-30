var Todo = require("../client_source/todo_model");
var assert = require("power-assert");
var sinon = require("sinon");
sinon.xhr.supportsCORS = true;

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

  describe("server access", function() {
    var server;
    beforeEach(function() {
      server = sinon.fakeServer.create();
      server.respondImmediately = true;
      m.deps({XMLHttpRequest: server.shr});
    });
    afterEach(function() {
      server.restore();
    });

    it("can create single object from request", function() {
      server.respondWith("GET", "/tasks", [
          200,
          {"Content-Type": "application/json"},
          JSON.stringify({description: "my-task"})
      ]);
      return Todo.list().then(function(obj) {
        assert(obj.description() === "my-task");
      });
    });

    it("can store objects", function() {
      Todo.save([new Todo({description: "my-task-2"})]);

      var request = server.requests[0];
      assert(request.method === "POST");
      assert(request.url === "/tasks");

      var json = JSON.parse(request.requestBody);
      assert(json[0].description === "my-task-2");
    });
  });
});
