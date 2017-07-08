const express = require("express");
const exphbs =require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
// Porta
const port = 3000;
//Init app
const app = express();
//Visualizacao
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Override
app.use(methodOverride("_method"));

app.get("/" , function(req, res, next){
  res.render("searchusers");

});

app.listen(port, function(){
  console.log("Porta: "+ port);
});
