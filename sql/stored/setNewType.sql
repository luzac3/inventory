DROP PROCEDURE IF EXISTS setNewType;
DELIMITER //
-- ********************************************************************************************
-- setNewType 区分コードを登録する
--
-- 【処理概要】
--  区分コードを登録する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _type               ：区分名
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
CREATE PROCEDURE `setNewType`(
    IN `_type` VARCHAR(50)
    , OUT `exit_cd` INTEGER
)
COMMENT '区分コード登録'

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
        TYPE_CD INTO @_type_cd
    FROM
        C_TYPE_CD
    WHERE
        TYPE = _type
    ;

    SET @query = "";

    IF IFNULL(@_type_cd, '') = '' THEN
      SET @query = CONCAT(@query,"
        INSERT INTO C_TYPE_CD
        VALUES(
          (
            SELECT DISTINCT
              IFNULL(TYPE_CD,'000')
              FROM (
                SELECT
                  LPAD(MAX(CAST(TYPE_CD AS INT))+1,3,'0') as TYPE_CD
                FROM
                  C_TYPE_CD
              ) AS temp
          )
          ,'",_type,"'
        )
        ;
      ");
    END IF;

    SET @query_text = @query;

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SELECT
      TYPE_CD
    FROM
      C_TYPE_CD
    WHERE
      TYPE = _type
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
