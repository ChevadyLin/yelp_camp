var port = process.env.PORT || 3000;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://Chevady:12345@cluster0.ar2sq.mongodb.net/<dbname>?retryWrites=true&w=majority", {
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(() => console.log("Connect to DB!"))
.catch(error => console.log(error.message));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


//Passport Configuration
app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dog",
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);

app.listen(port, function () {
  console.log("Server Has Started!");
});