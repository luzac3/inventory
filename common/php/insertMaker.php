<?php
header('Content-Type: text/html; charset=utf8mb4');
function insertMaker($argArr){
  $root = $_SERVER["DOCUMENT_ROOT"];

  require_once $root . '/inventory/common/php/stored.php';
  require_once $root . '/inventory/common/php/conection.php';

      $tableName = $argArr["tableName"];

      // sqlファイル内容生成
      $sql = "SET NAMES utf8mb4;";

      $sql .= "INSERT INTO ";
      $sql .= $tableName;
      $sql .= " VALUES";

      $colArr = $argArr["sql"];

      forEach($colArr as $rowArr){
          $sql .= "(";
          forEach($rowArr as $item){
              if($item =="null" || $item == ""){
                  $sql .= "NULL,";
                  continue;
              }
              if($item == "now"){
                  $sql .= "NOW(3),";
                  continue;
              }
              $sql .= "'" . $item . "',";
          }
          $sql = substr($sql, 0, -1);
          $sql .= ")";
          $sql .= ",";
      };

      $sql = substr($sql, 0, -1);
      $sql .= ";";

      $sql .= PHP_EOL . "COMMIT;";
      $sql .= PHP_EOL . "quit";

      // 一時ファイル用のタイムスタンプを取得
      $time = time();
      // 一時ファイル名を設定
      $tempFile = "insertTemp_" . $time . ".sql";

      // sqlファイル生成場所
      $sqlFileDir = $root . "inventory/sql/";

      // sqlファイル生成
      file_put_contents($sqlFileDir.$tempFile, $sql);

      // ユーザー情報の指定
      $dbInfo = new DbInfo;

      $username = $dbInfo->username;
      $server = $dbInfo->server;
      $password = $dbInfo->password;
      $db_name = $dbInfo->db_name;

      $ret = "sh " . $root . "inventory/common/sh/kickSql.sh " .$sqlFileDir.$tempFile. " " .$username. " " .$server. " " .$password. " " .$db_name;

      // sqlファイルを生成し、シェルスクリプトをキックすることで起動し、削除する
      $output = shell_exec("sh " . $root . "inventory/common/sh/kickSql.sh " .$sqlFileDir.$tempFile. " " .$username. " " .$server. " " .$password. " " .$db_name);

      // ファイルの削除
      unlink($sqlFileDir.$tempFile);

      return $ret;
}
?>
