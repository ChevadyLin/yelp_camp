var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middleware = require("../middleware/index");

//INDEX
router.get("/",function(req,res) {
	Campground.find({},function(err,allCampgrounds) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});	
		}
	})
})

//CREATE -- add new campground to database
router.post("/", middleware.isLoggedIn, function(req,res) {
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	var newCampground = {name:name,price:price,image:image,description:desc,author:author};
	//create a new campground and save it to DB
	Campground.create(newCampground, function(err,newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			//redirect back to campgrounds
			res.redirect("/campgrounds");
		}
	})
})

//NEW -- show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req,res) {
	res.render("campgrounds/new");
})

//SHOW -- more information about one campground
router.get("/:id",function(req,res) {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			//render the show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
}) 

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res) {
		Campground.findById(req.params.id, function(err,foundCampground) {
				res.render("campgrounds/edit",{campground:foundCampground});	
		});
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res) {
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground) {
		if(err) {
			res.redirect("/campgrounds");
		}
		else {
			//redirect to the show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/campgrounds");
		}
		else {
			req.flash("success","Comment deleted!");
			res.redirect("/campgrounds");
		}
	});
});




module.exports = router;