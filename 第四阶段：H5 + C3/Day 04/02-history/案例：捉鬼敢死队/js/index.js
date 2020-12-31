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