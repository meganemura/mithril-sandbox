// Model: Todo
var Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(false);
};

// Class method: List tasks from local storage
Todo.list = function() {
  var tasks = [];
  var src = localStorage.getItem("todo");
  if (src) {
    var json = JSON.parse(src);
    for (var i = 0; i < json.length; i++) {
      tasks.push(new Todo(json[i]));
    }
  }
  return m.prop(tasks);
}

// Class method: Save tasks to local storage
Todo.save = function(todoList) {
  localStorage.setItem("todo",
      JSON.stringify(todoList.filter(function(todo) {
        return !todo.done();
      })));
};

// View Model
var vm = {
  init: function() {
    vm.list = Todo.list();
    vm.description = m.prop("");
    vm.add = function() {
      if (vm.description()) {
        vm.list().push(new Todo({description: vm.description()}));
        vm.description("");
        Todo.save(vm.list());
      }
    };
    vm.check = function(value) {
      this.done(value);
      Todo.save(vm.list());
    };
  }
};

// Controller
function controller() {
  vm.init();
}

// View
function view() {
  return m("div", [
      // 1.
      m("input", {onchange: m.withAttr("value", vm.description), value: vm.description()}),

      // 2.
      m("button", {onclick: vm.add}, "Add"),

      // 3.
      m("table", vm.list().map(function(task) {
        return m("tr", [
            m("td", [
              // 4.
              m("input[type=checkbox]", {onclick: m.withAttr("checked", vm.check.bind(task)), value: task.done()})
              ]),

            // 5.
            m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
            ]);
      }))
    ]);
}

m.mount(document.getElementById('root'), {controller: controller, view: view});
