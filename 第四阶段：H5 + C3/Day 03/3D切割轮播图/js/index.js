// 页面加载
$(function () {
  // 获取左右按钮
  var $btn_arrow = $(".arrow");

  // 获取轮播图
  var $lis = $("li");

  // 控制图片切换顺序
  var index = 0;

  // 判断动画是否完成
  var flag = true;

  // 绑定事件
  $btn_arrow.eq(0).on("click", function () {
    if(!flag) return false;
    flag = false;
    $lis.css({
      transform: "rotateX(" + (++index) * 90 + "deg)",
    }).each(function (index, item) {
      $(item).css("transition", "transform .5s ease-out " + index * 0.2 + "s");
    });
  });

  $btn_arrow.eq(1).on("click", function () {
    if(!flag) return false;
    flag = false;
    $lis.css({
      transform: "rotateX(" + (--index) * 90 + "deg)",
    }).each(function (index, item) {
      $(item).css("transition", "transform .5s ease-out " + index * 0.2 + "s");
    });
  });

  // 监听一次动画是否完成
  $("li:last").on("transitionend",function(){
    flag = true;
  });
});