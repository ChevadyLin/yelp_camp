var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectID,
			ref:"User"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectID,
			ref:"Comment"
		}
	]
});

//Model Setup
module.exports = mongoose.model("Campground", campgroundSchema);