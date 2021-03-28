const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/finalexam';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("連線成功");
});
const roomSchema = new mongoose.Schema({
    roomID: Number,  //房間ID
    type: Boolean, //遊戲種類
    roompeople: String, //遊戲房間有誰
    coin: Number, //遊戲要花多少錢
    chat:[]
});
roomSchema.set('collection', 'room');
const model = mongoose.model('room', roomSchema);
module.exports = model;