$(function () {
    /**
     * 初始化fullpage组件
     */
    $("#fullpage").fullpage({
        // 设置各屏背景色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 设置fullpage导航
        navigation: true,
        // 页面初始化后执行
        afterRender: function () {
            // 往下点击按钮
            $(".btn_more").click(function () {
                $.fn.fullpage.moveSectionDown();
            });
            // 渲染星级
            starRender($(".section07 .star"), 5);
        },
        // 当某一屏加载后
        afterLoad: function (orgin, index) {
            $(this).removeClass("leave").addClass("now");
            // 处理第四屏的购物车搬运物件
            if (index == 4) {
                $(".section03 .img_sofa").hide();
            } else if (index == 5) {
                $(".section05 .img_sofa").show();
            } else if (index == 7) {
                $(".section07 .star").find("img").each(function (index, item) {
                    $(item).css({
                        "opacity": 1,
                        "transition": "opacity .5s linear " + (index - 1) * 0.5 + "s"
                    })
                });
            } else if (index == 8) {
                var $hand = $(".section08 .img_hand");
                // 鼠标跟随
                $(document).on('mousemove',function(e){
                    $hand.css({
                        left:e.clientX - 60 + "px",
                        top:e.clientY + 10 + "px"
                    });
                });
                // 再来一次
                $(".section08 .btn_again").click(function(){
                    $(".section").removeClass("now leave");
                    // 渲染星级
                    starRender($(".section07 .star"), 5);
                    $(".section03 .img_sofa").show();
                    $(".section05 .img_sofa").hide();
                    $(".section07 .star").find("img").css("opacity",0);
                    $(".section05 .img_sofa").removeClass("leave");

                    // 跳回到第一页
                    $.fn.fullpage.silentMoveTo(1);
                });
            }
        },
        // 当某一屏离开后
        onLeave: function (index, nextIndex) {
            $(this).addClass("leave");
            if (index == 5 && nextIndex == 6) {
                $(".section05 .img_sofa").addClass("leave")
            }
        }

    });

    // 渲染星级
    function starRender(container, num) {
        // 先清空容器内的星级
        container.empty();
        for (var i = 1; i <= num; i++) {
            container.append("<img src='images/07-star.png'>");
        }
        container.find("img").css({
            marginRight: "7px",
            float: "left",
            opacity: 0
        });
    }
});