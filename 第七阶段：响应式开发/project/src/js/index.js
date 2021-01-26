// 页面加载
$(function(){
  var sec = $("section");
  var footer = $("#pg_footer");
  var head = $("#pg_head");
  var dot = $(".pg_scroll li");

  $(document).on("scroll",function(){
    // 获取一屏幕高度
    var pgHeight = $(".part").height();
    // console.log(pgHeight);
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(docHeight,top);
    if(top >= sec.eq(1)[0].offsetTop - head.height()){
      head.addClass("light");
    }else{
      head.removeClass("light");
    }
    sec.each(function(index,item){
      if(top > (item.offsetTop - pgHeight * 0.2)){
        if(index == 1){
          $(item).find(".pic").show().addClass("wow bounceInDown animated");
          dot.eq(1).addClass("active").siblings().removeClass("active");
        }else if(index == 2){
          $(item).find(".pic").show().addClass("wow flipInX animated");
          dot.eq(2).addClass("active").siblings().removeClass("active");
        }else if(index == 3){
          $(item).find(".pic").show().addClass("wow animated rollIn");
          dot.eq(3).addClass("active").siblings().removeClass("active");
        }else{
          dot.eq(0).addClass("active").siblings().removeClass("active");
        }
      }
    });
    if(top > ( $(document).height() - $(window).height() - pgHeight * 0.2)){
      dot.eq(4).addClass("active").siblings().removeClass("active");
      footer.find(".foot_brand").addClass("wow animated slideInDown").end()
            .find(".foot-contact li").eq(0).addClass("wow animated slideInLeft").end()
            .eq(1).addClass("wow animated slideInRight").end().end()
            .find(".coop a").addClass("wow animated slideInUp");
    }
  });

  // 侧边控制
  $(".pg_scroll").on("click",dot,function(e){
    $(e.target).addClass("active").siblings().removeClass("active");
    var idx = $(e.target).data("page");
    window.scrollTo({
      left:0,
      top:sec.eq(idx-1).offset().top,
      behavior:"smooth"
    });
  });

  // 首页第一屏的下拉按钮控制
  $(".body_fir .btn_down").click(function(){
    window.scrollTo({
      left:0,
      top:$(".body_sec").offset().top,
      behavior:"smooth"
    });
  });
})