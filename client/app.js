// Model: Todo
var Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(false);
};

// View Model
var vm = {
  init: function() {
    vm.list = m.prop([]);         // 1.
    vm.description = m.prop("");  // 2.
    vm.add = function() {         // 3.
      if (vm.description()) {
        vm.list().push(new Todo({description: vm.description()}));
        vm.description("");
      }
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
              m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), value: task.done()})
              ]),

            // 5.
            m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
            ]);
      }))
    ]);
}

m.mount(document.getElementById('root'), {controller: controller, view: view});
