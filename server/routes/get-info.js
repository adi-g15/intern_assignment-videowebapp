const router = require("express").Router();
const videoModel = require("../models/video");
const topicModel = require("../models/topic");
const userModel = require("../models/user");

const { checkAuthenticated } = require("../middlewares/auth");

router.get('video', (req, res) => {
    const video_name = req.query.name;

    videoModel.findOne({name: video_name}).lean()
                .then(doc => {
                    if(!doc) {
                        res.sendStatus(404);
                    }

                    res.json(doc);
                })
                .catch(err => {
                    console.error("Some error happended... ", err);

                    res.sendStatus(500);
                })
})

router.get('topic', (req, res) => {
    const topic_name = req.query.name;

    topicModel.findOne({name: topic_name}).lean()
                .then(doc => {
                    if(!doc) {
                        res.sendStatus(404);
                    }

                    res.json(doc);
                })
                .catch(err => {
                    console.error("Some error happended... ", err);

                    res.sendStatus(500);
                })
})

router.get('user', (req, res) => {
    const username = req.query.username;

    userModel.findOne({name: username}).lean()
                .then(doc => {
                    if(!doc) {
                        res.sendStatus(404);
                    }

                    // only limited information returned
                    res.json({
                        username: doc.username,
                        fullname: doc.fullname,
                        topics_followed: doc.topics_followed
                    });
                })
                .catch(err => {
                    console.error("Some error happended... ", err);

                    res.sendStatus(500);
                })
})

router.get('authenticated-user', checkAuthenticated, (req, res) => {
    const username = req.query.username;

    userModel.findOne({name: username}).lean()
                .then(doc => {
                    if(!doc) {
                        res.sendStatus(404);
                    }

                    // return ALL data, stored in database
                    res.json(doc);
                })
                .catch(err => {
                    console.error("Some error happended... ", err);

                    res.sendStatus(500);
                })
})

module.exports = router;
