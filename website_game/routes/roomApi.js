var express = require('express');
var router = express.Router();
const roomModel = require('../models/roomModel');
var id = 1;//存房間ID

router.post('/creat', function (req, res) {
    const newroom = new roomModel({
        roomID: id,
        type: req.body.type,
        roompeople: req.body.roompeople,
        coin: req.body.coin,
        chat: []
    });
    id++;
    newroom.save(function (err, data) { //將房間的資料存進資料庫
        if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success", "data": data });
        }
    });
});
//創建房間
router.get('/getRoom', function (req, res) {
    roomModel.find(function (err, data) {
        if (err) console.log(err);
        res.json(data);
    });
});
//取得所有房間的資料

router.get('/getRoomID/refresh', function (req, res) {
    roomModel.findOne({ "roomID": req.query.roomID }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "無此房間" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "type": data.type, "chat": data.chat.lenght, "roompeople": data.roompeople.split("|").length });
        }
    })
});
router.get('/getRoomID', function (req, res) {
    roomModel.findOne({ "roomID": req.query.roomID }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "無此房間" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success", "data": data });
        }
    })
});

//取得特定ID的房間資料
router.post('/getRoomID', function (req, res) {
    if (req.body.roompeople == "") {
        roomModel.deleteOne({ "roomID": req.body.roomID }, function (err) {
            if (err) {
                res.json({ 'message': 'err', "status": "1" });
            }
            else {

                res.json({ 'message': "成功刪除房間", "status": "0" });
            }
        })
    }
    else {
        roomModel.updateOne({ "roomID": req.body.roomID }, { $set: { "roompeople": req.body.roompeople } }, function (err) {
            if (err) {
                res.json({ 'message': 'err', "status": "1" });
            }
            else {

                res.json({ 'message': "成功更新房間資料", "status": "0" });
            }
        })
    }
});
//更新特定ID的房間資料，如果傳來的資料中房間內無人存在，則直接把房間資料刪掉

router.post('/getRoomID/chat', function (req, res) {
    roomModel.updateOne({ "roomID": req.body.roomID }, { $push: { "chat": {"who":req.body.who,"msg":req.body.msg}}}, function (err, data) {
        if (err) {
            res.json({ 'message': 'err', "status": "1" });
        }
        else {

            res.json({ 'message': "成功發送聊天訊息", "status": "0" });
        }
    });
});

router.post('/getRoomID/game', function (req, res) {
    roomModel.updateOne({ "roomID": req.body.roomID }, { $set: { "type": req.body.type}}, function (err, data) {
        if (err) {
            res.json({ 'message': 'err', "status": "1" });
        }
        else {

            res.json({ 'message': "遊戲模式已更新", "status": "0" });
        }
    });
});

router.post('/getRoomID/coin', function (req, res) {
    roomModel.updateOne({ "roomID": req.body.roomID }, { $set: { "coin": req.body.coin}}, function (err, data) {
        if (err) {
            res.json({ 'message': 'err', "status": "1" });
        }
        else {

            res.json({ 'message': "遊戲價格已更新", "status": "0" });
        }
    });
});

router.post('/getRoomID/remove', function (req, res) {
    roomModel.deleteOne({ "roomID": req.body.roomID }, function (err, data) {
        if (err) {
            res.json({ 'message': 'err', "status": "1" });
        }
        else {

            res.json({ 'message': "成功刪除房間", "status": "0" });
        }
    });
});
module.exports = router;