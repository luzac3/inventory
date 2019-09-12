<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/inventory/common/php/stored.php';
require_once $root . '/inventory/common/php/insertMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];

    if($argArr["url"] === ""){
        $webFlg = null;
    }else{
        $webFlg = 1;
    }

    $argArr["sql"]["type"] = call_stored("setNewType",[$argArr["sql"]["type"]]);

    $argArr["sql"]["buyPlace"] = call_stored("setNewBuyPlace",[
        $argArr["sql"]["buyPlace"]
        ,$webFlg
        ,$argArr["url"]
    ]);

    $output = insertMaker(
      array(
        "tableName"=>$argArr["tableName"]
        ,"sql"=>$argArr["sql"]
      )
    );

    echo json_encode($output);
}else{
    echo json_encode(0);
}
?>
