const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/finalexam';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("連線成功");
});
const memberSchema = new mongoose.Schema({
    account: String,  //帳號
    password: String, //密碼
    ready:Boolean,
    coin: Number //錢的數量
});
memberSchema.set('collection', 'member');
const model = mongoose.model('member', memberSchema);
module.exports = model;