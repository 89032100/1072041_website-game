var express = require('express');
var router = express.Router();
const playModel = require('../models/playModel');
router.post('/play', function (req, res) {
    const newpss = new playModel({
        gameID: req.body.gameID,
        coin: req.body.coin,
        win: req.body.win,
        people: []
    });
    playModel.countDocuments({ gameID: req.body.gameID }, function (err, data) {
        if (data > 0) {
            res.json({ "status": 1, "msg": "遊戲已存在!" });
        } else {
            newpss.save(function (err, data) {
                if (err) {
                    res.json({ "status": 1, "msg": "error" });
                } else {
                    res.json({ "status": 0, "msg": "success", "data": data });
                }
            });
        }
    });
});
router.get('/getpssID', function (req, res) {
    playModel.findOne({ gameID: req.query.gameID }, function (err, data) {
        if (err) console.log(err);
        res.json(data);
    });
});

router.post('/getpssID', function (req, res) {
    playModel.updateOne({ "gameID": req.body.gameID }, {
        $addToSet: { "people": { "who": req.body.who, "use": req.body.use } }
    }, function (err, data) {
        if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "成功送出" });
        }
    });
});
router.post('/getpssID/delete', function (req, res) {
    playModel.deleteOne({ "gameID": req.body.gameID },
        function (err, data) {
            if (err) {
                res.json({ "status": 1, "msg": "error" });
            } else {
                res.json({ "status": 0, "msg": "遊戲結束" });
            }
        });
});
module.exports = router;