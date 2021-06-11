const router = require("express").Router();
const {random_video_list}  = require("../util/video");

/**
 *  @brief -  GET home page
 * */
router.get("/", (req, res) => {
	res.status(404).json({ Note: "Nothing to be found from here" });
});

// @future - Add functionality to return videos based on user's interests
router.get("/videos", async (req, res) => {
	const limit = req.query.limit ? parseInt(req.query.limit): 30;	// how many 'new' videos to return

	res.json({
		results: await random_video_list(limit)
	})
})

module.exports = router;
