window.addEventListener("load",function () {
    var userInfo;
        //功能交互
    var actionFunc = {
        //登录校验
        loginVerify: function (uname, upass) {
            if (uname && upass) {
                tool.ajax({
                    method: "GET",
                    url: "data/user.json",
                    fn: function (res) {
                        userInfo = JSON.parse(res.responseText);
                        for (var i = 0; i < userInfo.user.length; i++) {
                            if (uname == userInfo.user[i].username && upass == userInfo.user[i].password) {
                                return true;
                            }
                        }
                        return false;
                    }
                });
            }
        },
        //购物车数据更新
        updateCar:function () {
            var car = tool.getEleByClass("num")[0];
            var lists = tool.getEleByClass("shopcar_detail")[0].children;
            car.innerText = lists.length-1;
        }
    };

    (function () {
        var btn_reg = tool.getEleByClass("btn_reg")[0];
        var btn_login = tool.getEleByClass("btn_login")[0];
        var btn_cls = tool.getEleByClass("btn_close")[0];
        var signup_dialog = tool.$("signupDialog");
        var modal = tool.$("modal");
        var iframe = document.getElementsByTagName("iframe")[0];
        var btns_prot = document.getElementsByTagName("a");


        //注册
        btn_reg.addEventListener("click",function () {
            tool.show(signup_dialog);
            tool.show(modal);
        });
        btn_cls.addEventListener("click",function () {
            tool.hide(signup_dialog);
            tool.hide(modal);
        });
        for (var i = 0; i < btns_prot.length; i++) {
            (function(i){
                btns_prot[i].addEventListener("click",function () {
                    iframe.src = this.getAttribute("data-src");
                });
            })(i);
        }

        //购物车
        var shop_module = tool.getEleByClass("shopcar_module")[0];
        var btn_car = tool.getEleByClass("shopcar")[0];
        var car_cont = tool.getEleByClass("shopcar_detail")[0];
        var contH = tool.getStyle(car_cont,"height");
        car_cont.style.height = 0;
        car_cont.style.opacity = 1;

        shop_module.addEventListener("mouseenter",function(){
            btn_car.style.background = "#fff";
            btn_car.style.color = "#ee702e";
            tool.addClass(shop_module,"active");
            tool.buffer(car_cont,{
                "height":parseInt(contH)
            },null);
        });
        shop_module.addEventListener("mouseleave",function () {
            car_cont.style.boxShadow = "none";
            setTimeout(function () {
                tool.buffer(car_cont,{
                    "height":0
                },function () {
                    btn_car.style.background = "#424242";
                    btn_car.style.color = "#b0b0b0";
                    tool.removeClass(shop_module,"active");
                });
            },50);
        })
        actionFunc.updateCar();

        //主菜单
        var menuSecCont = tool.getEleByClass("menu_sec_container")[0];
        var menuSec = tool.getEleByClass("menu_sec");
        var menuFir = tool.getEleByClass("menu_fir");
        var nav = tool.$("navtop_r");
        var menuTop = menuFir[0].offsetHeight;
        var menuH = menuSecCont.offsetHeight;

        menuSecCont.style.top = menuTop + "px";
        menuSecCont.style.height = 0;
        menuSecCont.style.overflow = "hidden";
        menuSecCont.style.opacity = 1;

        var isLeaved = true;    //判断是否离开主菜单


        for (var j = 0; j < menuFir.length; j++) {
            (function(j){
                menuFir[j].addEventListener("mouseenter",function () {
                    j<menuFir.length-2 ? isLeaved = false : isLeaved = true;
                    if(!isLeaved){
                        menuSecCont.style.borderTop = "1px solid #e0e0e0";
                        menuSecCont.style.boxShadow = "0px 2px 2px 0px #b0b0b0";
                        tool.buffer(menuSecCont, {
                            "height": menuH
                        }, null);
                        for (var k = 0; k < menuSec.length; k++) {
                            menuSec[k].style.display = "none";
                        }
                        menuSec[j].style.display = "block";
                    }else {
                        menuSecCont.style.borderTop = "none";
                        menuSecCont.style.boxShadow = "none";
                        tool.buffer(menuSecCont, {
                            "height": 0
                        }, null);
                    }
                });
                nav.addEventListener("mouseleave",function () {
                    isLeaved = true;
                    menuSecCont.style.borderTop = "none";
                    menuSecCont.style.boxShadow = "none";
                    tool.buffer(menuSecCont, {
                        "height": 0
                    }, null);
                });
            })(j);
        }

        (function () {
            //轮播图效果
            tool.swiper(tool.$("m_main_pic"),{
                autoplay: true,
                lists: true,
                seamless:true
            });

            //倒计时效果
            var eTime = new Date("2020/7/4 22:00").getTime();
            var sTime = 0,mSeconds = 0,hours = 0,minutes = 0,seconds = 0;
            console.log(1);
            var timerId = setInterval(function(){
                if(sTime == eTime){
                    clearInterval(timerId);
                }else {
                    sTime = new Date().getTime();
                    mSeconds = eTime - sTime;
                    hour = parseInt(mSeconds / (60 * 60 * 1000));
                    minute = parseInt(mSeconds % (60 * 60 * 1000) / (60 * 1000));
                    second = parseInt(mSeconds % (60 * 60 * 1000) % (60 * 1000) / 1000);

                    //格式化时间
                    hour = hour >= 10 ? hour : ("0" + hour);
                    minute = minute >= 10 ? minute : "0" + minute;
                    second = second >= 10 ? second : "0" + second;

                    tool.getEleByClass("hour")[0].innerText = hour;
                    tool.getEleByClass("minute")[0].innerText = minute;
                    tool.getEleByClass("second")[0].innerText = second;
                }
            },1000);

            //模块轮播
            tool.swiper(tool.$("m_carousel"),{
                autoplay:false,
                lists:false,
                seamless: true
            });



        })();



    })();

});