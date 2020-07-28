const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true }
)
var userSchema=new mongoose.Schema({
    email:String,
    name:String,
    phone:Number
})
var user= new mongoose.model("user",userSchema);
app.get("/",function(req,res){
    res.render("home");
})
app.get("/register",function(req,res){
    res.render("register");
})
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/register",function(req,res){
    var randomUser=new user({
        email:req.body.username,
        name:req.body.name,
        phone:req.body.phone
    });
    randomUser.save();
    var rand=Math.floor(Math.random() * 1000);
    res.render("secrets",{RAND:rand,name:req.body.name,NAME:req.body.username,PHONE:req.body.phone});
})
app.post("/login",function(req,res){
    user.findOne({phone:req.body.phonee},function(err,foundUser){
        if(err){
            res.render("home");
        }
        else{
            res.send(foundUser)
        }
    })});
    
    

app.listen(3000, function () {
    console.log("server is running on port 3000")
});