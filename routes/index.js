var express= require("express");
var router =express.Router();
var User =require("../models/user");
var passport=require("passport");

router.get("/",function(req,res){
    res.render("home");
});

// register routes ===================

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    req.body.username;
    req.body.password;
    var newUser=new User({username : req.body.username});
    var password=req.body.password;
    User.register(newUser,password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
                req.flash("success","welcome" +req.body.username);
            });   
        }
    });
});


//login route

router.get("/login",function(req,res){
   
    res.render("login");
    
});

router.post("/login",passport.authenticate("local",
{
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
}),function(req,res){
    
});
// logout routes============

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","you are logged out!");
    res.redirect("/campgrounds");
});

module.exports=router;