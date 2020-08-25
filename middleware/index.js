var middleware = {};
var Comment = require("../models/comment");
var Campground = require("../models/campground");

middleware.isLoggedIn = function(req,res,next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error","You need to be logged in to proceed!");
	res.redirect("/login")
};

middleware.checkCommentOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err,foundComment) {
			if(err) {
				req.flash("error","campground not found.")
				res.redirect("/campgrounds" + req.params.id);
			}
			else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error","Permission denied!")
					res.redirect("back");
				}
			}
		})
	}
	else {
		req.flash("error","You need to be logged in to proceed!")
		res.redirect("back");
	}
};

middleware.checkCampgroundOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err,foundCampground) {
			if(err) {
				console.log(err);
				res.redirect("/campgrounds");
			}
			else {
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error","Permission denied!");
					res.redirect("back");
				}
			}
		})
	}
	else {
		req.flash("error","You need to be logged in to proceed");
		res.redirect("back");
	}
};

module.exports = middleware;