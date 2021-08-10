const { response } = require("express");
var express= require("express");
const { route } = require(".");
var router =express.Router();
var Campground=require("../models/campground");
var middlewareObj=require("../middleware");

// index -to show all campgrounds
router.get("/",function(req,res){
    //get data from database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/campgrounds" ,{cmpData:allCampgrounds});
        }
    });

    //
});

// create -to get all campgrounds
router.post("/",middlewareObj.isLoggedIn,function(req,res){
     var name=req.body.name;  
     var price=req.body.price; 
     var image=req.body.image;
     var description=req.body.description;
     var auther = {
        id:req.user._id,
        username:req.user.username  
        }
     var campgroundData={ name:name,price:price,image:image ,description:description,auther:auther };
     Campground.create(campgroundData,function(err,newlyCreated){    
        if(err){
                console.log(err);
            } else{
                req.flash("success","you are successfully created campground");
                res.redirect("/campgrounds");
                
            }
     });
});

//new -to show the form
router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
     res.render("campgrounds/new");
});


// it's a show route
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, found){
        if(err){
            console.log(err);
        }   else{
            res.render("campgrounds/show",{cmpData : found});
        }
    });   
});

//==========EDIT FORM AND PUT requiest

router.get("/:id/edit",middlewareObj.checkCampgroundOwnership,function(req,res){

    //found the campground and send data to the edit page
        Campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                req.flash("error","campground not found");
                res.redirect("/campgrounds");
            } else {
                res.render("campgrounds/edit",{campground:foundcampground});
            }
        });
});

router.put("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
    // found campground and update the data of campground
    var name=req.body.name; 
    var price=req.body.price;    
    var image=req.body.image;
    var description=req.body.description;
    var campgroundData={ name:name,price:price,image:image ,description:description};

    //i change something because of the trace worning to findByIdAndUpdate =useFindAndModify  
    Campground.findByIdAndUpdate(req.params.id,campgroundData,function(err,UpdatedCampground){
        if(err){
            req.flash(err.massege);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success","campground updated successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err,deletedCampground){
        if(err){
            
            res.redirect("/campgrounds");
            req.flash("error","something went wrong");
        }
        else{
            req.flash("success","your campground is successfully deleted");
            res.redirect("/campgrounds");
            
        }
    });
})

module.exports=router;