var AddressFinder = {
  init: function() {
    PubSub.subscribe("address.find", AddressFinder.find);
  },
  find: function(msg, postalCode) {
    m.request({
      method: "GET", url: "/api/getaddress",
      data: {postalcode: postalCode}})
    .then(function(data) {
      if (data) {
        PubSub.publishSync("address.receive", data);
      }
    });
  }
};

AddressFinder.init();

// Subcomponent for address form
var AddressForm = {
  controller: function(args) {
    var self = this;
    this.gotAddress = function(msg, address) {
      args.yomi(address[0].yomi);
      args.address(address[0].kanji);
    };

    // Start subscribing
    this.token = PubSub.subscribe("address.receive", this.gotAddress);

    // Event Handler
    this.find = function() {
      PubSub.publish("address.find", args.postalCode());
    };

    this.onunload = function() {
      // Unsubscribe when the component is deleted
      PubSub.unsubscribe(self.token);
    };
  },
  view: function(ctrl, args) {
    return m("form", [
        m("div", ["Postal Code: ",
          m("input", {maxlength: 7, onchange: m.withAttr("value", args.postalCode)}, args.postalCode()),
          m("button[type=button]", {onclick: ctrl.find}, "Search address")
          ]),
        m("div", ["Kana: ",
          m("input", {onchange: m.withAttr("value", args.yomi), value: args.yomi()})
          ]),
        m("div", ["Address: ",
          m("input", {onchange: m.withAttr("value", args.address), value: args.address()})
          ])
        ]);
  }
};

var AddressPage = {
  controller: function() {
    this.postalCode = m.prop("");
    this.yomi = m.prop("");
    this.address = m.prop("");
    this.submit = function() {
      // TODO: Confirm
    };
  },
  view: function(ctrl) {
    return [
      m("h3", "Input Address"),
      m.component(AddressForm, ctrl),
      m("button[type=button]", {onclick: ctrl.submit}, "Confirm")
    ];
  }
};

m.mount(document.getElementById("root"), AddressPage);
