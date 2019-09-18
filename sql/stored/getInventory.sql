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
      TIM.NO AS NO
      ,TIM.NAME AS NAME
      ,TIM.COLOR AS COLOR
      ,TIM.PICT_DATA AS PICT_DATA
      ,TIM.TYPE_CD AS TYPE_CD
      ,CTC.TYPE AS TYPE
      ,TIM.BUY_DATE AS BUY_DATE
      ,TIM.PRICE AS PRICE
      ,TIM.UNIT AS UNIT
      ,TIM.ITEM_NUMBER AS ITEM_NUMBER
      ,(CASE
          WHEN TIM.DISCOUNT_FLG = "1" THEN "あり"
          WHEN TIM.DISCOUNT_FLG = "0" THEN "なし"
          ELSE "その他"
      END) AS DISCOUNT_FLG
      ,TIM.DISCOUNT_TYPE AS DISCOUNT_TYPE
      ,TIM.DISCOUNT_RATE AS DISCOUNT_RATE
      ,TIM.BUY_PLACE_CD AS BUY_PLACE_CD
      ,(CASE
          WHEN CBPC.WEB_FLG = "1"  THEN CBPC.URL
          WHEN CBPC.WEB_FLG = "0" THEN CBPC.BUY_PLACE
          ELSE "その他"
      END) AS BUY_PLACE
      ,TIM.LEFT_ITEM AS LEFT_ITEM
      ,TIM.PLACE AS PLACE
      ,TIM.REGISTER_DATE AS REGISTER_DATE
      ,TIM.UPDATE_DATE AS UPDATE_DATE
    FROM
      T_INVENTORY_MSTR TIM
    LEFT OUTER JOIN C_TYPE_CD CTC
        ON TIM.TYPE_CD = CTC.TYPE_CD
    LEFT OUTER JOIN C_BUY_PLACE_CD CBPC
        ON TIM.BUY_PLACE_CD = CBPC.BUY_PLACE_CD
    WHERE
      NO = _tag_no
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
