


$(document).ready(function () {
    console.log('房間ID顯示!');
    $('#roomtitle').text("遊戲房間" + $.cookie('roomID'));
});

//進入房間後顯示房間的名稱

$(document).ready(function () {
    if (!$.cookie('username') || $.cookie('username') == "null") {
        $('#usernameInRoom').text("Visitor");
    } else {
        $('#usernameInRoom').text($.cookie('username'));
    }
});

//進入房間後在玩家列表上顯示玩家名稱

$(document).ready(function () {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie("roomID");
    var people;
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) { //查詢所在房間的資料
        people = res.data.roompeople.replace($.cookie('username'), ""); //people為字串，取得當前房間有哪些人後，把自己的名字從字串中刪除
        people = people.replace("|", "");//刪除分隔玩家名字的符號
        //所以現在people會只剩下另一個玩家的名字，或者是空字串代表房間沒人
        $.cookie("otherpeople", people);
        $.ajaxSettings.async = true;
        if (people != "") {
            $('#OtherusernameInRoom').text(people);
        }
    });
});

function chat() {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    var API = "http://localhost:3000/room/getRoomID/chat";
    var who = $.cookie('username');
    var msg = $("#msg").val();
    var data = { 'roomID': $.cookie('roomID'), 'who': who, 'msg': msg };
    $.ajaxSettings.async = false;
    $.post(API, data, function (res) {
        console.log(res.message);
    })
    $("#chat").text('');
    $.get(api, function (res, status) {
        for (var i = 0; i < res.data.chat.length; i++) {
            newchat(res.data.chat[i]);
        }
    })
    $("#msg").val('');
    $.ajaxSettings.async = true;
}

function newchat(data) {
    let content =
        `<div class="msg">
            <span class="name">${data.who}</span>
            ${data.msg}
        </div>
        `
    $('#chat').append(content);
}

$(document).ready(function () {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    $.ajaxSettings.async = false;
    $("#chat").text('');
    $.get(api, function (res, status) {
        for (var i = 0; i < res.data.chat.length; i++) {
            newchat(res.data.chat[i]);
        }
    })
    $.ajaxSettings.async = true;
});

function changegame() {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    var API = "http://localhost:3000/room/getRoomID/game";
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) {
        var data = { "roomID": $.cookie('roomID'), "type": !res.data.type }
        $.post(API, data, function (res) {
            console.log(res);
        })
        $("#game").text(!res.data.type ? "猜拳遊戲" : "連點遊戲");
    })
    $.ajaxSettings.async = true;
}

$(document).ready(function () {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) {
        $("#game").text(res.data.type ? "猜拳遊戲" : "連點遊戲");
    })
    $.ajaxSettings.async = true;
});

function betLOW() {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    var API = "http://localhost:3000/room/getRoomID/coin";
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) {
        var coin = res.data.coin - 10;
        var data = { "roomID": $.cookie('roomID'), "coin": coin }
        $.post(API, data, function (res) {
            console.log(res);
        })
        $("#bet").text(coin);
    })
    $.ajaxSettings.async = true;
}

function betHIGH() {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    var API = "http://localhost:3000/room/getRoomID/coin";
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) {
        var coin = res.data.coin + 10;
        var data = { "roomID": $.cookie('roomID'), "coin": coin }
        $.post(API, data, function (res) {
            console.log(res);
        })
        $("#bet").text(coin);
    })
    $.ajaxSettings.async = true;
}

$(document).ready(function () {
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    $.ajaxSettings.async = false;
    $.get(api, function (res, status) {
        $("#bet").text(res.data.coin);
    })
    $.ajaxSettings.async = true;
});

function readyplay() {
    var api = "http://localhost:3000/member/ready?account=" + $.cookie('username');
    var API = "http://localhost:3000/member/ready";
    $.ajaxSettings.async = false;
    $.get(api, function (res) {
        if (res.status == 1) {
            alert(res.msg);
        } else {
            var re = !res.data;
            $.cookie('ready', re);
            var data = { 'account': $.cookie('username'), "ready": re };
            $.post(API, data, function (res) {
                console.log(res.msg);
            })
            location.href = '/public/room.html';
        }
    });
    $.ajaxSettings.async = true;
}

$(document).ready(function () {

    if ($.cookie("ready") == "true") {
        $('#ready').addClass("fieldB");
        $('#ready').removeClass("fieldC");
    }
    else {
        $('#ready').addClass("fieldC");
        $('#ready').removeClass("fieldB");
    }
});

$(document).ready(function () {
    var API = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');

    $.ajaxSettings.async = false;
    $.get(API, function (res) {
        if (res.status == 1) {
            alert(res.msg);
        } else {
            people = res.data.roompeople.replace($.cookie('username'), "");
            people = people.replace("|", "");

            var api = "http://localhost:3000/member/ready?account=" + people;
            $.get(api, function (res) {
                $.cookie('otherready', res.data);
                if (res.data) {
                    $('#Otherready').addClass("field2");
                    $('#Otherready').removeClass("field3");
                }
                else {
                    $('#Otherready').addClass("field3");
                    $('#Otherready').removeClass("field2");
                }
            })
        }
    });
    $.ajaxSettings.async = true;
});

setInterval(function () { //每秒刷新一次
    var a,b;
    var api = "http://localhost:3000/member/ready?account=" + $.cookie("otherpeople");
    var api2 = "http://localhost:3000/member/ready?account=" + $.cookie("username");
    $.get(api, function (res) {
        a = res.data;
        console.log(a);
        $.get(api2, function (res) {
            b = res.data;
            console.log(b);
            if (a && b) {
                location.href = '/public/ready.html';
                $.removeCookie("ready");
                $.removeCookie("otherready");
                console.log("game fuck start");
            }
        })
    })
    
}, 1000);