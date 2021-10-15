var express = require('express');
var app = express();
var fs = require("fs");

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.send(data);
  });
});

app.get('/api/:id', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse(data);
    var user = users["user" + req.params.id];
    console.log(user);
    res.send(JSON.stringify(user));
  });
});

app.get('/api/test', function (req, res) {
  res.send("test");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})

app.post('/api/add', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.json(data);
  });
});
