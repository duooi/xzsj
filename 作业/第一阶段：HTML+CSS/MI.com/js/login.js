window.addEventListener("load", function (ev) {
    (function () {
        var btns_type = tool.getEleByClass("lg_type")[0].children;
        var types_main = tool.getEleByClass("lg_main")[0].children;
        var account_main = tool.getEleByClass("account_main")[0];
        var mess_main = tool.getEleByClass("mess_main")[0];

        for (var i = 0; i < btns_type.length; i++) {
            (function (i) {
                btns_type[i].addEventListener("click", function (evt) {
                    for (var j = 0; j < types_main.length; j++) {
                        tool.removeClass(btns_type[j],"active");
                        tool.hide(types_main[j]);
                    }
                    tool.addClass(btns_type[i],"active");
                    tool.show(types_main[i]);
                });
            })(i);
        }

        var btn_phone = tool.getEleByClass("phone_lg")[0];
        var btn_account = tool.getEleByClass("account_lg")[0]
        var account_cont = tool.getEleByClass("account_cont")[0];
        var phone_cont = tool.getEleByClass("phone_cont")[0];

        btn_phone.addEventListener("click",function () {
            tool.hide(account_main);
            tool.show(mess_main);
            tool.hide(account_cont);
            tool.show(phone_cont);
        });
        btn_account.addEventListener("click",function () {
            tool.show(account_main);
            tool.hide(mess_main);
            tool.show(account_cont);
            tool.hide(phone_cont);
        });
    })();
});
