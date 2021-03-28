function register() {
    console.log("register");
    var _ac = $('#ac').val();
    var _pw = $('#pw').val();

    if (!_ac || !_pw) {
        alert('請輸入未填欄位!');
    }
    else {
        var api = "http://localhost:3000/member/register";
        var data = { 'account': _ac, 'password': _pw, 'coin': 50 ,ready:false}; //預設有50元
        $.post(api, data, function (res) {
            if (res.status == 0) {
                alert('註冊成功!');
                location.href = '/public/index.html';
            } else {
                alert(res.msg);
                location.href = '/public/index.html';
            }
        });
    }
}

//註冊功能

function login() {
    var _account = $('#ac').val();
    var _password = $('#pw').val();
    if (!_account || !_password) {
        alert('請輸入帳號密碼!');
    }
    else {
        $.post("/member/login", { 'account': _account, 'password': _password }, function (res) {
            if (res.status == 1) {
                alert(res.msg);
            } else {
                $.cookie('username', res.data.account);
                $.cookie('coin', res.data.coin);
                //cookie存使用者名稱和錢的數量
                alert('登入成功!');
                location.href = '/public/lobby.html';
            }
        });
    }
}

//登入功能

$(document).ready(function () {
    if (!$.cookie('username') || $.cookie('username') == "null") {
        $('#username').text("Visitor");
    } else {
        $('#username').text("UserName : " + $.cookie('username'));
        $('#coin').text($.cookie('coin'));
    }
});

//cookie有登入的話 在上方顯示使用者名稱和錢
//沒有登入就是遊客

function logout() {
    $.removeCookie("username");
    $.removeCookie("coin");
    location.href = '/public/index.html';
}

//登出按鈕清除cookie並回到首頁


