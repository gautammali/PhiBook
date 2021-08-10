var   bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      passport              =require("passport"),
      LocalStrategy         =require("passport-local").Strategy,
      methodOverride        =require("method-override"),
      flash                 =require("connect-flash"),
      User                  =require("./models/user"),
      Campground            =require("./models/campground"),
      SeedData              =require("./seeds"),
      Comment               =require("./models/comment"),
      express               = require("express"),
      app                   = express();
   

var indexRoutes =require("./routes/index");
var commentsRouter =require("./routes/comments");
var campgroundsRouter =require("./routes/campgrounds");
app.use(flash());   
mongoose.connect("mongodb://localhost/phi-book",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.connect("mongodb+srv://gautammali:gautam@7600@cluster0.mcas0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// mongoose.connect("mongodb+srv://phiBook:phiBook@study123@cluster0.sosrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

//mongoose.connect("mongodb+srv://gautam:gautam@cluster0.k6lhq.mongodb.net/test");

mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));

//SeedData(); //seeds data file

// PASSPORT CONFIG.
app.use(require("express-session")({
     secret:"hello",
     resave: false,
     saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new  LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.use(methodOverride("_method"));
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentsRouter);
app.use("/campgrounds",campgroundsRouter);

app.listen(process.env.PORT || 8080);
