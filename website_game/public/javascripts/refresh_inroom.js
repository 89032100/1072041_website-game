setInterval(function () { //每秒刷新一次
    var API = "http://localhost:3000/room/getRoomID?roomID=" + $.cookie('roomID');
    $.ajaxSettings.async = false;
    $.get(API, function (res, status) {
        if ($.cookie('peoplecount') != res.data.roompeople.length) {
            $.cookie('peoplecount', res.data.roompeople.length);
            history.go(0);
        }
        var gametype = res.data.type ? "true" : "false";
        if ($.cookie('gametype') != gametype) {
            $.cookie('gametype', gametype);
            history.go(0);
        }
        if ($.cookie('gamecoin') != res.data.coin) {
            $.cookie('gamecoin', res.data.coin);
            history.go(0);
        }
        var people = res.data.roompeople.replace($.cookie('username'), "");
        people = people.replace("|", "");

        var api = "http://localhost:3000/member/ready?account=" + people;
        $.get(api, function (res) {

            var otherready = res.data ? "true" : "false";
            if ($.cookie('otherready') != otherready) {
                $.cookie('otherready', otherready);
                history.go(0);
            }


        })
        if ($.cookie('chat') != res.data.chat.length) {
            $.cookie('chat', res.data.chat.length);
            history.go(0);
        }
    })
    $.ajaxSettings.async = true;
}, 1000);
