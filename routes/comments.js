var express= require("express");
var router =express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj=require("../middleware");
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{cmpData : campground} );
        }
    });  
});

router.post("/",middlewareObj.isLoggedIn,function(req,res){
//find by id 
Campground.findById(req.params.id,function(err,campground){
    if(err){
        console.log(err);
        res.redirect("/campgrounds");
    }
    else{
        Comment.create(req.body.comment,function(err,comment){
            if(err){
                console.log(err);
            } else{
                comment.author.id =req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success","your comment successfully craeted");
                res.redirect("/campgrounds/" + campground._id);
                
            }
        });
    }     
}); 
});

// update the Comment

router.get("/:comment_id/edit",middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit",{comment:foundcomment,cmpData_id :req.params.id})
        }
    });  
});

router.put("/:comment_id",middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,commentupdated){
        if(err){
            console.log(err);
        }   else{
            req.flash("success","your comment edited successfully");
            res.redirect("/campgrounds/" + req.params.id);
            
        }
    })
});

// COMMENT DELETE ROUTE 

router.delete("/:comment_id",middlewareObj.checkCommentOwnership,function(req,res){
    //FOUNd the comment and delete it
    Comment.findByIdAndRemove(req.params.comment_id,function(err,updatedcomment){
        if(err){
            console.log(err);
        } else{
            req.flash("success","your comment successfully Deleted");
            res.redirect("/campgrounds/" + req.params.id);
           
        }
    }); 
});




module.exports=router;