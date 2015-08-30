var PlaySoundButton = {
  controller: function() {
    this.id = Date.now() + "-" + Math.random();
    this.onclick = function() {
      document.getElementById(this.id).play();
    };
  },
  view: function(ctrl, args) {
    return m("div", [
        m("audio", {id: ctrl.id}, [
          m("source", {src: args.source})
          ]),
        m("button", {onclick: ctrl.onclick.bind(ctrl)}, args.label)
        ]);
  }
};

var myApp = {
  controller: function() {},
  view: function() {
    return m("div", [
        m.component(PlaySoundButton, {source: "stunts.mp3", label: "Play"})
        ]);
  }
};

m.mount(document.getElementById("root"), myApp);
