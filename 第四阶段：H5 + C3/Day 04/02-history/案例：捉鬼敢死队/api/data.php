<?php
  
  header("Content-Type","application/json");
  $html = "";
  $page = "";

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

$obj = array("page“=>$page,"html"=>$html);

echo $obj;