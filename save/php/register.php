<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/timeKeeper/common/php/stored.php';
require_once $root . '/timeKeeper/common/php/insertMaker.php';
require_once $root . '/timeKeeper/common/php/updateMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];

    // 洗替でコンテンツのユーザーリストを削除
    $result = stored(
        "deleteCntntJnnr"
        ,array($argArr["cntntCd"])
    );

    if($argArr["url"] === ""){
        $webFlg = null;
    }else{
        $webFlg = 1;
    }

    $output1 = insertMaker(
      array(
        "tableName"=>"C_TYPE_CD"
        ,"sql"=>[$argArr["sql"]["type"]]
      )
    );

    $output2 = insertMaker(
      array(
        "tableName"=>"C_BUY_PLACE_CD"
        ,"sql"=>[
          $argArr["sql"]["buyPlace"]
          ,$webFlg
          ,$argArr["url"]
        ]
      )
    );


    $output = insertMaker(
      array(
        "tableName"=>$argArr["tableNameJoinner"]
        ,"sql"=>$argArr["sql"]
      )
    );

    echo json_encode($output);
}else{
    echo json_encode(0);
}
?>
