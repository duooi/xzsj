// 页面加载
$(function () {
    /**
     * 1.处理视频缓冲加载
     * 2.初始化视频时长
     * 3.给视频播放/暂停按钮、最大最小化按钮、进度条绑定相关事件
     * 4.声音调大调小
     */

    var $video = $("video"),
        $pg_line = $(".progress .line"),
        $pg_bar = $(".progress .bar"),
        $vc_line = $(".voice .line"),
        $vc_bar = $(".voice .bar"),
    var prev_sound = $vc_bar.height();

    // 1.处理视频缓冲加载
    $video[0].oncanplay = function () {
        // 1.1 视频准备就绪
        $(this).show();
        // 1.2 初始化视频时长
        $(".all").text(formatTime(this.duration));

    }

    $video[0].ontimeupdate = function(){
        $(".curr").text(formatTime(this.currentTime));
        render(this.currentTime,this.duration);
    }

    // 2.视频播放/暂停
    $(".btn_play").click(function(){
        if($(this).hasClass("fa-play")){
            $video[0].play();
            $(this).removeClass("fa-play").addClass("fa-pause");
        }else{
            $video[0].pause();
            $(this).addClass("fa-play").removeClass("fa-pause");
        }
    });

    // 3.最大最小化按钮
    $(".btn_expand").click(function(){
        if($(this).hasClass("fa-arrows-alt")){
            $video[0].webkitRequestFullScreen();
            $(this).removeClass("fa-arrows-alt").addClass("fa-compress");
        }else{
            document.webkitCancelFullScreen();
            $(this).addClass("fa-arrows-alt").removeClass("fa-compress");
        }
    });

    // 4.进度条拖动
    $pg_bar.click(function(e){
        $pg_line.css("width",e.offsetX + "px");
        var curr = e.offsetX / $pg_bar.width() * $video[0].duration;
        $video[0].currentTime = curr;
        $(".curr").text(formatTime(curr));
    });

    // 5.声音调大调小
    $vc_bar.click(function(e){
        $vc_line.css("height",$vc_bar.height() - e.offsetY + "px");
        var rate = ($vc_bar.height() - e.offsetY) / $vc_bar.height();
        $video[0].volume = $vc_sound * rate;
    });

    /**
     * 格式化时间
     * @param {number} time 
     */
    function formatTime(time) {
        var h = Math.floor(time / 3600),
            m = Math.floor(time % 3600 / 60),
            s = Math.floor(time % 3600 % 60);

        return (h >= 10 ? h : "0" + h) + ":" + (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
    }

    /**
     * 根据时间进度渲染进度条
     * @param {number} curr 
     * @param {number} duration
     */
    function render(curr,duration){
        var rate = curr / duration * $pg_bar.width();
        $pg_line.css("width",rate + "px");
    }
});