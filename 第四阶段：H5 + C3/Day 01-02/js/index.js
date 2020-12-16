$(function(){
    /**
     * 初始化fullpage组件
     */
    $("#fullpage").fullpage({
        // 设置各屏背景色
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 设置fullpage导航
        navigation:true,
        // 页面初始化后执行
        afterRender:function(){
            // 往下点击按钮
            $(".btn_more").click(function(){
                $.fn.fullpage.moveSectionDown();
            });
        },
        // 当某一屏加载后
        afterLoad:function(orgin,index){
            $(this).addClass("now");
            // 处理第四屏的购物车搬运物件
            if(index == 4){
                $(".section03 .img_sofa").hide();
            }
        },
        // 当某一屏离开后
        onLeave:function(index,nextIndex){
            $(this).addClass("leave");
        }
                
    });
});