
function paper() {
    console.log("paper!");
    var api = "http://localhost:3000/game/getpssID";
    var data = { 'gameID': $.cookie("roomID"), who: $.cookie("username"), use: "paper" };
    $.post(api, data, function (res) {
        console.log(res);
    });

    $('#scissors').hide();
    $('#stone').hide();
}
function scissors() {
    console.log("scissors!");
    var api = "http://localhost:3000/game/getpssID";
    var data = { 'gameID': $.cookie("roomID"), who: $.cookie("username"), use: "scissors" };
    $.post(api, data, function (res) {
        console.log(res);
    });
    $('#paper').hide();
    $('#stone').hide();
}
function stone() {
    console.log("stone!");
    var api = "http://localhost:3000/game/getpssID";
    var data = { 'gameID': $.cookie("roomID"), who: $.cookie("username"), use: "stone" };
    $.post(api, data, function (res) {
        console.log(res);
    });
    $('#scissors').hide();
    $('#paper').hide();
}

$(document).ready(function () {

    $.ajaxSettings.async = false;
    console.log("start!!");
    var api = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie("roomID");
    var API = "http://localhost:3000/game/play";
    $.get(api, function (res) {
        var DATA = { "gameID": res.data.roomID, "coin": res.data.coin };
        $.post(API, DATA, function (res) {
            console.log(res.message);
        })

    })
    var API = "http://localhost:3000/member/ready";
    var data = { 'account': $.cookie('username'), "ready": false };
    $.post(API, data, function (res) {
        console.log(res.msg);
    })
    data = { 'account': $.cookie('otherpeople'), "ready": false };
    $.post(API, data, function (res) {
        console.log(res.msg);
    })
    var API = "http://localhost:3000/room/getRoomID/remove";
    data = { "roomID": $.cookie("roomID") };
    $.post(API, data, function (res) {
        console.log(res.msg);
    })
    $.ajaxSettings.async = true;
});


setInterval(function () { //每秒刷新一次

    var api = "http://localhost:3000/game/getpssID?gameID=" + $.cookie("roomID");
    $.get(api, function (res) {

        if (res.people.length == 2) {
            $.ajaxSettings.async = false;
            var coin = 0;
            console.log("雙方出全");
            if (res.people[0].use == "paper" && res.people[1].use == "paper") {
                alert("平手\n金錢數量不變");
            } if (res.people[0].use == "scissors" && res.people[1].use == "scissors") {
                alert("平手\n金錢數量不變");
            } if (res.people[0].use == "stone" && res.people[1].use == "stone") {
                alert("平手\n金錢數量不變");
            }
            if (res.people[0].use == "paper" && res.people[1].use == "stone") {
                alert($.cookie("username") == res.people[0].who ? "你贏了\n金錢+" + res.coin : "你輸了\n金錢-" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? res.coin : 0-res.coin;
            }
            if (res.people[0].use == "paper" && res.people[1].use == "scissors") {
                alert($.cookie("username") == res.people[0].who ? "你輸了\n金錢-" + res.coin : "你贏了\n金錢+" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? 0-res.coin : res.coin;
            }
            if (res.people[0].use == "scissors" && res.people[1].use == "paper") {
                alert($.cookie("username") == res.people[0].who ? "你贏了\n金錢+" + res.coin : "你輸了\n金錢-" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? res.coin : 0-res.coin;
            }
            if (res.people[0].use == "scissors" && res.people[1].use == "stone") {
                alert($.cookie("username") == res.people[0].who ? "你輸了\n金錢-" + res.coin : "你贏了\n金錢+" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? 0-res.coin : res.coin;
            }
            if (res.people[0].use == "stone" && res.people[1].use == "scissors") {
                alert($.cookie("username") == res.people[0].who ? "你贏了\n金錢+" + res.coin : "你輸了\n金錢-" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? res.coin : 0-res.coin;
            }
            if (res.people[0].use == "stone" && res.people[1].use == "paper") {
                alert($.cookie("username") == res.people[0].who ? "你輸了\n金錢-" + res.coin : "你贏了\n金錢+" + res.coin);
                coin = $.cookie("username") == res.people[0].who ? 0-res.coin : res.coin;
            }
            var API = "http://localhost:3000/member/coin";
            var data = { "account": $.cookie("username"), "coin": coin };
            $.post(API, data, function (res) {
                console.log(res.message);
            })
            api = "http://localhost:3000/game/getpssID/delete";
            data = { "gameID": $.cookie("roomID") };
            $.post(api, data, function (res) {
                console.log(res.message);
            })
            location.href = '/public/lobby.html';
            $.ajaxSettings.async = true;
        }
    })

}, 1000);
