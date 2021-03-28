

function creatroom() {
    console.log("creatroom!");
    var api = "http://localhost:3000/room/creat";

    var data = { 'type': true, 'coin': 10, 'roompeople': $.cookie('username') }; //預設是猜拳、一局10元、房間裡面有開房的那個人(查cookie)
    $.post(api, data, function (res) {
        location.href = '/public/room.html';
        $.cookie('roomID', res.data.roomID); //cookie存房間ID用於顯示，從1往上++
    });
}

//創建房間

function newroom(data) {
    var aa = data.roompeople.split("|").length;
    //房間內有哪些玩家我是用一個字串存，用|隔開  ex:Joker|Cray 代表有Joker和Cray兩人
    //這邊宣告一個字串陣列，用|字符分割字串，透過查詢長度即可知道房間有多少人
    var bb = data.type; //遊戲種類 true為猜拳 false為連點
    let content =
        `<div><a onclick="joinroom(${data.roomID})" class="lobbyRoom">
        <ul class="roominfo">
            <li class="RoomName">遊戲房間${data.roomID}</li>
            <li class="game">${(bb ? "猜拳" : "連點")}遊戲</li>
            <li class="player"><span>${aa}/2</span></li>
        </ul>
        </a></div>
    `
    $('#container').append(content);
}

//在大廳頁面把資料庫裡的房間顯示出來，包括人數、遊戲種類、房間ID

function joinroom(id) {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + id;
    var API = "http://localhost:3000/room/getRoomID";
    var join;
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) { //查詢所在房間的資料
        join = res.data.roompeople + "|" + $.cookie('username');
        var data = { 'roompeople': join, 'roomID': id }
        $.post(API, data, function (res) { //將資料傳回資料庫更新，詳細請看roomApi.js
            console.log(res.message);
        });
    })
    $.cookie('roomID', id);
    $.ajaxSettings.async = true;
    location.href = '/public/room.html';
}

function leaveroom() {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie("roomID");
    var API = "http://localhost:3000/room/getRoomID";
    var ReadyApi = "http://localhost:3000/member/ready";
    var left;
    $.ajaxSettings.async = false; //開啟同步，讓get以及post得到回傳值之後才繼續進行後面的程式碼
    $.get(api, function (res, status) { //查詢所在房間的資料
        left = res.data.roompeople.replace($.cookie('username'), ""); //left為字串，取得當前房間有哪些人後，把自己的名字從字串中刪除
        left = left.replace("|", "");//刪除分隔玩家名字的符號
        //所以現在left會只剩下另一個玩家的名字，或者是空字串代表房間沒人
        var data = { 'roompeople': left, 'roomID': $.cookie("roomID") }
        $.post(API, data, function (res) { //將資料傳回資料庫更新，詳細請看roomApi.js
            console.log(res.message);
            $.removeCookie("roomID");
        });
        var data = { 'account': $.cookie('username'), 'ready': false }
        $.post(ReadyApi, data, function (res) { //將資料傳回資料庫更新，詳細請看roomApi.js
            console.log(res.message);
            $.removeCookie("ready");
            $.removeCookie("otherready");
            $.removeCookie("otherpeople");
        });
    });
    $.ajaxSettings.async = true;//關閉同步
    location.href = '/public/lobby.html';
}

//離開房間，透過cookie查你在哪個房間，並且從資料庫中把人移除，如果房間完全沒人了，那就直接刪除這個房間


$(document).ready(function () {
    var api = "http://localhost:3000/room/getRoom";
    
    $.get(api, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            newroom(data[i]);
        }
    })
    
});

//get取得所有房間資料，用newroom(data)把所有房間顯示出來


