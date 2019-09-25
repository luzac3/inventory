<?php
//header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/inventory/common/php/stored.php';
require_once $root . '/inventory/common/php/updateMaker.php';

if(!empty($_FILES["blob"])){
  $argArr=array(
    "tableName"=>$_POST["tableName"]
    ,"sql"=>explode(",",$_POST["sql"])
    ,"url"=>$_POST["url"]
    ,"terms"=>$_POST["terms"]
  );

  $argArr["sql"][3] = file_get_contents($_FILES["blob"]["tmp_name"]);

  $argArr["sql"][3] = "0x" . bin2hex($argArr["sql"][3]);



    $num = 0;

    foreach ($argArr["sql"] as $value) {
      $enc = mb_detect_encoding($value);
      $argArr["sql"][$num] = mb_convert_encoding($value,"UTF-8",$enc);
      $num++;
    }

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

    echo json_encode($output);
}else{
    echo json_encode(0);
}

function EncodeCore( &$value , $default_enc , $enc){
    if( is_array($value)){
        //配列の場合は再帰処理
        foreach ($value as &$value2) {
            EncodeCore($value2 , $default_enc , $enc);
        }
    }else if( $enc != $default_enc){
        //文字コード変換
        $value = mb_convert_encoding( $value , $default_enc , $enc ) ;
    }
}
?>
