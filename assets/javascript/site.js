var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var fortune = [];

app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "project2.html"));
});

app.get("/ball.jpeg", function (req, res) {
   res.sendFile(path.join(__dirname, "ball.jpeg"));
});

app.post("/eightball", function (req, res) {
   const eightball = require('8ball')()
   var newfortune = `${eightball}`;
   fortune.push(newfortune);
   res.json(newfortune);
   // console.log(newfortune);
});

app.listen(PORT, function () {
   console.log("App listening on PORT " + PORT);
});