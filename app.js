var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yukikogimi",
  database: "join_us"
});


app.get("/", function(req, res){
  //find count of users
  var q = "select count(*) as count from users;"
  connection.query(q, function(err, results){
    if (err) throw err;
    var count = results[0].count;
    res.render("home", {data: count});

  });
});

app.post("/register", function(req, res){
  var person = {
      email: req.body.email
  };

connection.query('insert into users set ?', person, function(err, result){
      if(err) throw err;
      res.redirect("/")
    });
});

app.get("/joke", function(req, res){
  var joke = "what do you call a dog that does magic tricks? a labracadabrador."
  res.send(joke);
});

app.get("/random_num", function(req, res){
  var num = Math.floor(Math.random() * 10) + 1;
  res.send("Your Luncky number is " + num);
});

app.listen(8080, function(){
  console.log("server running on 8080!");
});
