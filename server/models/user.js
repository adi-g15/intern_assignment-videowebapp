const { Schema, Types, model } = require("mongoose");

/**
 * @brief -> The users collection stores the user users of people using this service
 * 
 * @note -> As for the time being, you can simply just see the fields in the document schema, to understand what it stores
 */

const userSchema = new Schema({
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	fullname: {
		alias: "fullName",
		type: String,
		trim: true,
		required: true
	},
	password: {
        type: String,
        required: true
	},
	topics_followed: {
		type: [Types.ObjectId]
	},
	liked_vids: {
		type: [Types.ObjectId]
	},
	disliked_vids: {
		type: [Types.ObjectId]
	},
});

module.exports = model("user", userSchema);
