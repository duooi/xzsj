// 页面加载
$(function(){

    requestContent("index");

    /**
     * Ajax请求数据
     */
    function requestContent(page){
        $.ajax({
            url:"api/data.php",
            method:"GET",
            contentType: "application/json; charset=utf-8",
            data:{
                "page":page
            },
            dataType:"json",
            success:function(data){
                console.log(data);
            },
            failed:function(){

            }
        });
    }
});