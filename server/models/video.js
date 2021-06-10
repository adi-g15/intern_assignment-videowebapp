const { Schema, model } = require("mongoose");

const topicModel = require("./topic.js");

const video = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	data: String,   // TODO: DECIDE ACCORDING TO WHAT USED TO DELIVER IT
	topic: {
		type: String,
		default: "General",
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
	uploadedAt: {
		type: Date,
		default: new Date()
	}
});

video.post("save", async function () {
    topicModel.findOne({name: this.topic})
                .then(doc => {
                    if(!doc) {
                        // create topic
                        await topicModel.create([{
                            name: this.topic,
                            videoIds: [this.id]
                        }]);
                    }
                })
                .catch(err => {
                    console.error("Failed to create a new topic: ", this.topic, err);
                })
});

module.exports = model("video", video);
