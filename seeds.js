var mongoose=require("mongoose"),
    Campground=require("./models/campground");
var  Comment =require("./models/comment");

// var Data =[
//     {
//         name:"Android App Development in Android Studio: Java+Android Edition for Beginners",
//         image:"https://cdn.asaha.com/assets/thumbs/58c/58c7e9e501565ad2197077ea8ecb6e7a.jpg",
//         detail:"download me https://www.pdfdrive.com/download.pdf?id=60596566&h=86af6710fca68834c439be9649970710&u=cache&ext=pdf"
//     },
//     {
//         name:"Android Studio 3.0 Development Essentials - Android 8 Edition",
//         image:"https://cdn.asaha.com/assets/thumbs/75d/75d3189290eb93e6196ce20308c3daa6.jpg",
//         description:"download me  https://www.pdfdrive.com/download.pdf?id=158523877&h=fd3276e3f3700482d7317842f3d22f4e&u=cache&ext=pdf"
//     },
//     {
//         name:"Learn Android Studio 3 with Kotlin: Efficient Android App Development",
//         image:"https://cdn.asaha.com/assets/thumbs/c92/c92acd460d1531c0618a7440a92615c8.jpg",
//         description:"download me  https://www.pdfdrive.com/download.pdf?id=187207742&h=1461d3e520197966c59d4f7050c25b43&u=cache&ext=pdf"
//     },
//     {
//         name:"Pro Android with Kotlin: Developing Modern Mobile Apps",
//         image:"https://cdn.asaha.com/assets/thumbs/957/957b4d9ccce2f6eeb26dafea2cf984c1.jpg",
//         description:"download me  https://www.pdfdrive.com/download.pdf?id=187204564&h=b50868905079344dd8b9b94bd4bd7443&u=cache&ext=pdf"
//     }
// ]




function SeedData() {
    // REMOVED ALL data
    Campground.deleteMany({},function(err,Remove){
        if(err){
            console.log(err);
        } else {
            console.log("removed");
        }
        Data.forEach(function(data){
            Campground.create(data,function(err,campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("campgounds are created");
                    Comment.create(
                        {
                            text:"thsduf sfdkjkshf dfkshf",
                            author:"gsdiuri"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                                
                        });
                }
            });
        });
    });     
}

module.exports= SeedData;
