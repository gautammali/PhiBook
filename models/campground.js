var mongoose=require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name : String,
    price:String,
    image : String,
    description : String,
    auther:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]

});

var Campground = mongoose.model("Campground" , campgroundSchema);

module.exports= Campground;
