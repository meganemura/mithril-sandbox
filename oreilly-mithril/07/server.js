var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PostalCodes = require("./ken-all");

app.use(express.static("client"));
app.use(bodyParser.json());

app.get("/api/getaddress", function(req, res) {
  console.log("get /api/getaddress: " + req.query.postalcode);
  res.send(PostalCodes[req.query.postalcode]);
});

console.log("start listening at 8000");
app.listen(8000);
