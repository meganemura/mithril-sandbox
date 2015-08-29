var m = require('./mithril.js');
var render = require('mithril-node-render');

console.log(render(
      m("div", "<button onclick=\"alert('hello');\">test</button>")
));
