DROP PROCEDURE IF EXISTS newTagNo;
DELIMITER //
-- ********************************************************************************************
-- newTagNo 新規タグ番号作成
--
-- 【処理概要】
--  新規タグ番号作成
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--  なし
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.9.12 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `newTagNo`(
    OUT `exit_cd` INTEGER
)
COMMENT '新規タグ番号作成'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    SELECT
        NOW(3) INTO @makeDate
    FROM
        T_INVENTORY_MSTR
    ;

      SET @query = CONCAT("
        INSERT INTO T_INVENTORY_MSTR
        VALUES(
            (
              SELECT DISTINCT
                IFNULL(NO,'00000')
              FROM
                  (
                    SELECT DISTINCT
                      LPAD(MAX(CAST(NO AS SIGNED))+1,5,'0') AS NO
                    FROM
                      T_INVENTORY_MSTR
                  ) AS temp
              )
            ,''
            ,NULL
            ,NULL
            ,''
            ,''
            ,0
            ,NULL
            ,0
            ,NULL
            ,NULL
            ,NULL
            ,''
            ,0
            ,''
            ,@makeDate
            ,''
        )
        ;
      ");

      SET @query_text = @query;

      -- 実行
      PREPARE main_query FROM @query_text;
      EXECUTE main_query;
      DEALLOCATE PREPARE main_query;

    SELECT
      NO
    FROM
      T_INVENTORY_MSTR
    WHERE
      REGISTER_DATE = @makeDate
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
