var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Welcome to users application!');
});

app.get('/api/users', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.send(data);
  });
});

app.get('/api/users/:id', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse(data);
    var id = req.params.id;
    var user = users.find(u => u.id == id);
    console.log(users, id, user);
    res.send(JSON.stringify(user));
  });
});

app.get('/api/test', function (req, res) {
  res.send("This is a test message from the app...");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})

app.post('/api/add', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    var usr = req.body;
    usr.id = data.length + 1;
    console.log('body:', usr);
    data.push(usr);
    console.log('data:', data);
    res.json(data);
  });
});

app.delete('/api/users/:id', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    users = JSON.parse(data);
    var id = req.params.id;
    var idx = users.findIndex(u => u.id == id);
    var removed = users.splice(idx, 1);
    console.log(users, 'removed:', removed);
    res.json(removed);
  });
});
