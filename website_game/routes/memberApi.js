var express = require('express');
var router = express.Router();
const memberModel = require('../models/memberModel');
//註冊功能路由
router.post('/register', function (req, res) {
    const newMember = new memberModel({
        account: req.body.account,
        password: req.body.password,
        coin: req.body.coin,
        ready: req.body.ready
    });
    memberModel.countDocuments({ account: req.body.account }, function (err, data) {
        if (data > 0) {
            res.json({ "status": 1, "msg": "此帳號已被註冊!" });
        } else {
            newMember.save(function (err, data) {
                if (err) {
                    res.json({ "status": 1, "msg": "error" });
                } else {
                    res.json({ "status": 0, "msg": "success", "data": data });
                }
            });
        }
    });
});

router.post('/login', function (req, res) {
    memberModel.findOne({ account: req.body.account, password: req.body.password }, function (err
        , data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "帳號密碼錯誤!" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success", "data": data });
        }
    })
});

router.get('/ready', function (req, res) {
    memberModel.findOne({ account: req.query.account }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "錯誤!" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success", "data": data.ready });
        }
    })
});

router.post('/ready', function (req, res) {
    memberModel.updateOne({ account: req.body.account }, { ready: req.body.ready }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "錯誤!" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success" });
        }
    })
});

router.post('/coin', function (req, res) {
    memberModel.updateOne({ account: req.body.account }, { $inc: { coin: req.body.coin } }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "錯誤!" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success"});
        }
    })
});

router.get('/account', function (req, res) {
    memberModel.findOne({ account: req.query.account}, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "錯誤!" });
        } else if (err) {
            res.json({ "status": 1, "msg": "error" });
        } else {
            res.json({ "status": 0, "msg": "success","data":data});
        }
    })
});
module.exports = router;