const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/finalexam';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("連線成功");
});
const playSchema = new mongoose.Schema({
    gameID: Number,
    coin:Number,
    win: String,
    people:[]
});
playSchema.set('collection', 'game');
const model = mongoose.model('game', playSchema);
module.exports = model;