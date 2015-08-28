var express = require("express");
var app = express();

var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());             // 1.

app.get("/tasks", function(req, res) {  // 2.
  console.log("get tasks");
  try {
    res.send(JSON.parse(fs.readFileSync("todo.json", "utf8")));
  } catch(e) {
    res.send([]);
  }
});

app.post("/tasks", function(req, res) { // 3.
  console.log("post tasks");
  fs.writeFileSync("todo.json", JSON.stringify(req.body));
  res.status(200).end();
});

app.use(express.static("client"));

console.log("start listening at 8000");
app.listen(8000);
