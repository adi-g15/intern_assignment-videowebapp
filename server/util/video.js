const videoModel = require("../models/video");

async function random_video_list(limit = 10) {
    return new Promise((resolve, reject) => {
        videoModel.countDocuments({}).exec((err, count) => {
            const random = Math.floor(Math.random() * (count-limit));

            videoModel.find().skip(random).limit(limit).lean()
                      .then(docs => {
                          if(!docs) {
                              console.warn("Videos list was empty !", docs);
                          }

                          return resolve(data);
                      })
                      .catch(reject);
        });
    });
}

module.exports = {

}
