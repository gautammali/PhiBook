var Campground=require("../models/campground")
var Comment=require("../models/comment")
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership =function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                res.redirect("back");
            } else {
                if(foundcampground.auther.id.equals(req.user._id)){
                   next();
                }else{
                    res.redirect("back")
                }   
            }
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                   next();
                }else{
                    res.redirect("back")
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash("error","you need to be logged in to do that");
    
        res.redirect("/login");
    }
}

module.exports=middlewareObj;