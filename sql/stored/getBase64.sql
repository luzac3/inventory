DROP PROCEDURE IF EXISTS getBase64;
DELIMITER //
-- ********************************************************************************************
-- getBase64 base64データ取得
--
-- 【処理概要】
--  base64データ取得
--
--
-- 【呼び出し元画面】
--   なし
--
-- 【引数】
--  _tag_no                 :タグ番号
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.9.20 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `getBase64`(
    IN `_tag_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'base64データ取得'

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
      PICT_DATA
    FROM
      T_INVENTORY_MSTR
    WHERE
      NO = _tag_no
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
