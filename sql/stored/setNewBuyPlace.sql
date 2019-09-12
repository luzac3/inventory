DROP PROCEDURE IF EXISTS setNewBuyPlace;
DELIMITER //
-- ********************************************************************************************
-- setNewBuyPlace 新規購入場所コード作成
--
-- 【処理概要】
--  新規購入場所コード作成
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _buyPlace           ：購入場所
--   _webFlg             ：Webフラグ
--   _url                ：URL
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
CREATE PROCEDURE `setNewBuyPlace`(
    IN `_webFlg` INTEGER
    , IN `_buyPlace` VARCHAR(50)
    , IN `_url` VARCHAR(50)
    , OUT `exit_cd` INTEGER
)
COMMENT '新規購入場所コード作成'

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
        BUY_PLACE_CD INTO @_buyPlace_cd
    FROM
        C_BUY_PLACE_CD
    WHERE
        BUY_PLACE = _buyPlace
    ;

    SET @query = "";

    IF IFNULL(@_buyPlace_cd, '') = '' THEN
      SET @query = CONCAT(@query,"
        INSERT INTO C_TYPE_CD
        VALUES(
          (
            SELECT DISTINCT
              LPAD(MAX(CAST(BUY_PLACE_CD AS INT))+1,3,"0")
          )
          ,",_webFlg,"
          ,",_buyPlace,"
          ,",_url,"
        )
        ;
      ");
    END IF;

    SET @query = CONCAT(@query,"
      SELECT
        BUY_PLACE_CD
      FROM
        C_BUY_PLACE_CD
      WHERE
        BUY_PLACE = _buyPlace
      ;
    ");

    SET @query_text = CONCAT(@query,@event_num,@query_key,@group,";");

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
