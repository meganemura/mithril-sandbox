var m = require('./mithril.js');
var render = require('mithril-node-render');

console.log(render(
      m("div", m.trust("<button onclick=\"alert('hello');\">test</button>"))
));
