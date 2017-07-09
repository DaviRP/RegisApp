const express = require("express");
const exphbs =require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");

//client LEDISSS
let client=redis.createClient();

client.on("connect", function(){
  console.log("Regis Conneted")
})

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

//Busca de usuario pelo formulario
app.post("/user/search", function(req,res, next){
  let id = req.body.id;

  client.hgetall(id,function(err,obj){
    if(!obj){
      res.render("searchusers",{
        erro:"Usuario nao existe"
      });
    }else{
      obj.id=id;
      res.render("details",{
        user:obj
      });
    }
  });
});
//Adicionar Usuario
app.get("/user/add" , function(req, res, next){
  res.render("adduser");

});
//requisicao de post
app.post("/user/add" , function(req, res, next){
  let id=req.body.id;
  let first_name=req.body.first_name;
  let last_name=req.body.last_name;
  let email=req.body.email;
  let phone=req.body.phone;

  client.HMSET(id,[
    "first_name", first_name,
    "last_name", last_name,
    "email", email,
    "phone", phone 
    ], function(err,reply){
      if(err){
        console.log(err);
      }
      console.log(reply);
      res.redirect("/");
    
  });
});

//deletar Usuario

app.delete("/user/delete/:id",function(req,res,next){
  client.del(req.params.id);
  res.redirect("/");
});