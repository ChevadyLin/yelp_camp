var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment.js")

var data = [
	{
		name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
		description: "amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor"
	},
	{
		name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
		description: "amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor"
	},
	{
		name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",	
		description: "amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor"
	}
]

function seedDB() {
	Campground.remove({},function(err) {
		if(err) {
			console.log(err);
		}
		console.log("removed campgrounds!");
		for(var i=0; i<data.length; i++) {
			Campground.create(data[i],function(err,campground) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("add a campground!");
					//add a comment
					Comment.create({
						text:"This place is great",
						author:"Homer"
					}, function(err,comment) {
						if(err) {
							console.log(err);
						}
						else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment.");
						}
						
					})
				}
			})
		}
	})
}

module.exports = seedDB;



