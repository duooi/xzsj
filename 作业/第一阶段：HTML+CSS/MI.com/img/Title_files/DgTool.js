(function (w) {
    w.tool = {
        $:function (id) {   //根据id获取元素
            return typeof id == "string" ? document.getElementById(id) : null;
        },
        getEleByClass:function(clsName){    //根据class获取元素
            if(document.getElementsByClassName){
                return document.getElementsByClassName(clsName);
            }else{
                var arr = document.getElementsByTagName("*");
                var res = [];
                for(var i=0;i<arr.length;i++){
                    if(arr[i].className == clsName){
                        res.push(arr[i]);
                    }
                }
                return res;
            }
        },
        addClass:function(ele,clsName){       //给元素添加class类名
            if(ele && clsName) {
                ele.className === "" ? ele.className = clsName : ele.className += " " + clsName;
            }
        },
        removeClass:function(ele,clsName){
            if(ele.className && clsName ){
                var reg = new RegExp("(^"+clsName+"\\s*)|(\\s+"+clsName+")","g");
                ele.className = ele.className.replace(reg,"");
            }
        },
        getWin:function () {    //获取文档对象
            return document.documentElement || document.body;
        },
        getMinNum:function () {     //获取一组数的最小值和索引
            var arrList = arguments[0];
            var minValue = arrList[0],minIndex = 0;
            for (var i = 0; i < arrList.length; i++) {
                if(arrList[i] <minValue){
                    minValue = arrList[i];
                    minIndex = i;
                }
            }
            return {
                "minValue":minValue,
                "minIndex":minIndex
            };
        },
        getMaxNum:function () {     //获取一组数的最大值和索引
            var arrList = arguments[0];
            var maxValue = arrList[0],maxIndex = 0;
            for (var i = 0; i < arrList.length; i++) {
                if(arrList[i] <maxValue){
                    maxValue = arrList[i];
                    maxIndex = i;
                }
            }
            return {
                "maxValue":maxValue,
                "maxIndex":maxIndex
            };
        },
        getClient:function () {     //获取网页可视区域的宽高
            if(window.innerWidth && window.innerHeight){
                return{
                    "innerW":window.innerWidth,
                    "innerH":window.innerHeight
                };
            }else if(document.compatMode == "CSS1compat"){
                return{
                    "innerW":document.documentElement.innerWidth,
                    "innerH":document.documentElement.innerHeight
                }
            }else{
                return{
                    "innerW":document.body.innerWidth,
                    "innerH":document.body.innerHeight
                }
            }
        },
        getStyle:function (eleObj, attr) {  //获取盒子属性值
            if(eleObj.currentStyle){    //ie
                return eleObj.currentStyle[attr];
            }else{
                return getComputedStyle(eleObj,null)[attr];
            }
        },
        buffer:function (eleObj,json_attr,fn) {     //缓动动画
            clearInterval(eleObj.timer);
            if(eleObj && json_attr){
                var begin = 0, speed = 0,target = 0,isFinished = true;

                eleObj.timer = setInterval(function () {
                    isFinished = true;
                    for (var key in json_attr){
                        if (json_attr.hasOwnProperty(key)){
                            if(key === "opacity"){
                                begin = tool.getStyle(eleObj, key) * 100;
                                target = json_attr[key] * 100;
                            }else{
                                begin = parseInt(tool.getStyle(eleObj, key));
                                target = json_attr[key];
                            }

                            speed = (target - begin) * 0.2;
                            begin += begin > target ? Math.floor(speed):Math.ceil(speed);
                            if(begin !== target) {
                                isFinished = false;
                            }

                            if(key === "opacity"){
                                eleObj.style.opacity = begin / 100;
                            }else{
                                eleObj.style[key] = begin + "px";
                            }
                        }
                    }

                    if(isFinished){
                        clearInterval(eleObj.timer);
                        fn && fn();
                    }
                },20);
            }
        },
        swiper:function(parent,config){        //轮播特效
            var contents = parent.children[0];  //子层幻灯片
            var cards = contents.children;
            var lists = parent.children[1].children[0];  //子层控件
            var btn_l = parent.children[1].children[1];
            var btn_r = parent.children[1].children[2];
            var index = 0;  //定义全局索引
            var dots = 0;
            var timer = null;

            //初始化样式
            var cardW = cards[0].offsetWidth;
            var cardH = cards[0].offsetHeight;
            contents.style.position = "relative";
            contents.style.width = cardW + "px";
            contents.style.height = cardH + "px";


            for(var i=0;i<cards.length;i++){
                //排版图片
                cards[i].style.position = "absolute";
                cards[i].style.top = 0;
                if(i == 0){
                    cards[i].style.left = 0;
                }else{
                    cards[i].style.left = cardW + "px";
                }

                //初始化控件
                if(config.lists){
                    var ctrlLi = document.createElement("li");
                    lists.appendChild(ctrlLi);
                }
            }

            if(config.lists){
                dots = lists.children;
                tool.addClass(dots[0],"active");
            }

            var scroll = function (dir) {   //滚动函数
                if(config.lists){
                    for (var i = 0; i < dots.length; i++) {
                        tool.removeClass(dots[i],"active");
                    }
                }
                if(dir == "left"){
                    tool.buffer(cards[index],{
                        "left":cardW
                    },null);
                    if(config.seamless){
                        index <= 0 ? index = cards.length-1 : index --;
                    }else{
                        index <= 0 ? index = 0 : index --;
                    }
                    if(config.lists){
                        tool.addClass(dots[index],"active");
                    }
                    cards[index].style.left = -cardW + "px";
                    tool.buffer(cards[index],{
                        "left":0
                    },null);
                }else{
                    tool.buffer(cards[index],{
                        "left":-cardW
                    },null);
                    if(config.seamless){
                        index >= cards.length - 1 ? index = 0 : index++;
                    }else{
                        index >= cardH.length - 1 ? cardH.length - 1 : index ++;
                    }
                    if(config.lists){
                        tool.addClass(dots[index],"active");
                    }
                    cards[index].style.left = cardW + "px";
                    tool.buffer(cards[index],{
                        "left":0
                    },null);
                }
            };

            //左右按钮
            btn_l.addEventListener("click",function(){
                scroll("left");
            });
            btn_r.addEventListener("click",function () {
                scroll("right");
            });

            if(config.autoplay){
                timer = setInterval(scroll,2000);
            }

            parent.addEventListener("mouseenter",function () {
                clearInterval(timer);
            });
            parent.addEventListener("mouseleave",function () {
                timer = setInterval(scroll,2000);
            });

            //点列表
            if(config.lists){
                for(var k=0;k<dots.length;k++){
                    (function(k){
                        dots[k].addEventListener("mouseover",function () {
                            if(index < k){
                                tool.buffer(cards[index],{
                                    "left":-cardW
                                },null);
                                index = k-1;
                                scroll("right");
                            }else if(index > k) {
                                tool.buffer(cards[index],{
                                    "left":cardW
                                },null);
                                index = k+1;
                                scroll("left");
                            }
                        });
                    })(k);
                }
            }
        },
        cb:function (ev) {      //阻止冒泡
            if(ev.stopPropagation){
                ev.stopPropagation();
            }else{
                ev.cancelBubble = true;
            }
        },
        ajax:function (json) {
            var request;
            if(window.XMLHttpRequest){
                request = new XMLHttpRequest();
            }else{
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }

            request.open(json.method,json.url,true);
            request.send(json.data);
            request.onreadystatechange = function () {
                if(request.readyState == 4 && request.status == 200){
                    json.fn(request);
                }
            };
        },
        show:function (ele) {
            ele.style.display = "block";
        },
        hide:function (ele) {
            ele.style.display = "none";
        }
    }
})(window);