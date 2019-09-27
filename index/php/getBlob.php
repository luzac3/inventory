<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/inventory/common/php/stored.php';
require_once $root . '/inventory/common/php/updateMaker.php';

if(!empty($_POST["argArr"])){
  $tagNo = $_POST["argArr"];

  $blobHex = stored("getBlob",[$tagNo])[0]["PICT_DATA"];

  // $base64 = base64_encode($blobHex);
/*
  $blobHex = substr($blobHex,0);

  $blob = hex2bin($blobHex);

    echo json_encode($blob);
*/
  echo $blobHex;
}else{
    echo 0;
}
 ?>
