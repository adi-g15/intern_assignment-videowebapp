const router = require("express").Router();
const videoModel = require("../models/video");
const {random_video_list}  = require("../util/video");

/**
 * From SO: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274398
 * 
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Efficient approach maybe to cache database regularly then search through it,
 * instead of always calling database methods for auto-completetion
 */
router.get('/auto-complete', async (req, res) => {
    const search = req.query.search;
    if(typeof search !== 'string') {
        return res.sendStatus(304);
    } else if(search === '') {
        return res.json({
            results: random_video_list(10)
        })
    }

    // search for each word till we have more than 10 results
    const results = [];
    const words = shuffle(  // to have random importance of words each time
        search.split(' ')
    );
    for(const word of words) {
        const regex = new RegExp(word);
        await videoModel.find({name: regex}).lean().limit(10)
                    .then(docs => {
                        if(docs) {
                            results.push(...docs.map(vid => vid.title));
                        }
                    })
                    .catch(err => {
                        console.error("Failed to fetch word: ", err);
                    })

        if(results.length >= 10){
            break;
        }
    }

    res.json({
        results
    });
})

module.exports = router;
