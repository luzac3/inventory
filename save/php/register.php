<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/inventory/common/php/stored.php';
require_once $root . '/inventory/common/php/updateMaker.php';

if(!empty($_POST["argArr"])){
  $argArr = $_POST["argArr"];
/*
    $argArr = $_FILES["argArr"];

    if($argArr["url"] === ""){
        $webFlg = 0;
    }else{
        $webFlg = 1;
    }

    $argArr["sql"][4] = stored("setNewType",[$argArr["sql"][4]])[0]["TYPE_CD"];

    $argArr["sql"][12] = stored("setNewBuyPlace",[
        $webFlg
        ,$argArr["sql"][12]
        ,$argArr["url"]
    ])[0]["BUY_PLACE_CD"];

    $output = updateMaker(
      array(
        "tableName"=>$argArr["tableName"]
        ,"sql"=>$argArr["sql"]
        ,"terms"=>$argArr["terms"]
      )
    );
*/
    echo json_encode($argArr);
}else{
    echo json_encode(0);
}
?>
