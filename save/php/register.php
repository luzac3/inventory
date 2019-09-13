<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/inventory/common/php/stored.php';
require_once $root . '/inventory/common/php/insertMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];

    if($argArr["url"] === ""){
        $webFlg = 0;
    }else{
        $webFlg = 1;
    }

    $argArr["sql"]["type"] = stored("setNewType",[$argArr["sql"]["type"]])[0]["TYPE_CD"];

    $argArr["sql"]["buyPlace"] = stored("setNewBuyPlace",[
        $webFlg
        ,$argArr["sql"]["buyPlace"]
        ,$argArr["url"]
    ])[0]["BUY_PLACE_CD"];

    $output = insertMaker(
      array(
        "tableName"=>$argArr["tableName"]
        ,"sql"=>[$argArr["sql"]]
      )
    );

    echo json_encode($output);
}else{
    echo json_encode(0);
}
?>
