<?php
  
  header("Content-Type","application/json");
  $html = "";   // 存储页面内容
  $page = "";   // 存储页面标志

  // 如果接收到的page参数为index或者没接收到page
  if($_GET['page'] == "index" || !$_GET["page"]){
    $page = "index";
  }else if($_GET["page"] == "bill"){
    $page = "bill";
    $html = "BILL";
  }else if($_GET["page"] == "dan"){
    $page = "dan";
    $html = "DAN";
  }else if($_GET["page"] == "egon"){
    $page = "egon";
    $html = "EGON";
  }else if($_GET["page"] == "winston"){
    $page = "winston";
    $html = "WINSTON";
  }

// $obj = { page : $page , html : $html };

echo $_GET['page'];

?>