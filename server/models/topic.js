const { Schema, Types, model } = require("mongoose");

// Analogous to project/section in videoist
const topicSchema = new Schema({
	name: {
		type: String,
		unique: true,
        required: true,
        trim: true
	},
	videoIds: {
		type: [Types.ObjectId], // array of video ids
		required: true // since it should be initialised with at least one videoId
    },
    subscribers: {
        type: Number,
        default: 0
    }
});

topicSchema.methods.pushvideoId = function (id) {
	return this.videoIds.push(id);
};

module.exports = model("topic", topicSchema);
