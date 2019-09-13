DROP PROCEDURE IF EXISTS getInventory;
DELIMITER //
-- ********************************************************************************************
-- getInventory インベントリ取得
--
-- 【処理概要】
--  インベントリ取得
--
--
-- 【呼び出し元画面】
--   _tag_no              :タグ番号
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
--  2019.9.13 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `getInventory`(
    IN `_tag_no`  CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'インベントリ取得'

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
      NO
      ,NAME
      ,COLOR
      ,PICT_DATA
      ,TYPE_CD
      ,BUY_DATE
      ,PRICE
      ,UNIT
      ,ITEM_NUMBER
      ,DISCOUNT_FLG
      ,DISCOUNT_TYPE
      ,DISCOUNT_RATE
      ,BUY_PLACE_CD
      ,LEFT_ITEM
      ,PLACE
      ,REGISTER_DATE
      ,UPDATE_DATE
    FROM
      T_INVENTORY_MSTR
    WHERE
      NO = _tag_no
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
