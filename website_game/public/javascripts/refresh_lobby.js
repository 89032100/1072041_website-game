setInterval(function () { //每秒刷新一次
    var API = "http://localhost:3000/room/getRoom";
    $.ajaxSettings.async = false;
    $.get(API, function (res, status) {
        if ($.cookie('roomcount') != res.length) {
            $.cookie('roomcount', res.length);
            history.go(0);
        }
    })
    var API = "http://localhost:3000/member/account?account=" + $.cookie("username");
    $.get(API, function (res) {
        if ($.cookie('coin') != res.data.coin) {
            $.cookie("coin", res.data.coin);
            history.go(0);
        }
    })
    $.ajaxSettings.async = true;
}, 1000);
