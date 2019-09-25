// イベント列挙
function getDataList(){
        if(this.value=="register"){

            let inventoryArr = {};
            let sqlJoinnerArr = [];

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let nodeListLen = nodeList.length;

            for(let i=0; i < nodeListLen; i++){
                if(nodeList[i].name == "discountFlg"){
                  if(nodeList[i].checked){
                    inventoryArr["discountFlg"] = nodeList[i].value;
                  }
                  continue;
                }
                if(nodeList[i].id=="tagNo"){

                }
                inventoryArr[nodeList[i].id] = nodeList[i].value;
            }

            let ext = "";
            let imageType = "";
            let base64 = "";


            // 画像データ取得
            if(storager.check("ext")){
              let canvas = document.getElementById("canvasSave");
              ext = storager.get("ext");
              imageType = "image/" + ext;
              base64 = canvas.toDataURL(imageType);
            }

            let blob = base64toBlob(base64,imageType);

            let formDatabBlob = new FormData();

            formDatabBlob.append('blob',blob);


            let formDatabArgArr = new FormData();

          formDatabArgArr.append('tableName',"T_INVENTORY_MSTR");
          formDatabArgArr.append('sql',[
            inventoryArr["tagNo"]
            ,inventoryArr["name"]
            ,inventoryArr["color"]
            ,null
            ,inventoryArr["type"]
            ,inventoryArr["buyDate"]
            ,inventoryArr["price"]
            ,inventoryArr["unit"]
            ,inventoryArr["count"]
            ,inventoryArr["discountFlg"]
            ,inventoryArr["discountKind"]
            ,inventoryArr["discountRate"]
            ,inventoryArr["buyPlace"]
            ,inventoryArr["leftItem"]
            ,inventoryArr["storage"]
            ,"now"
            ,"now"
          ]);
          formDatabArgArr.append('url',inventoryArr["buyURL"]);
          formDatabArgArr.append('terms',"NO = '" + inventoryArr["tagNo"] + "'");
          formDatabArgArr.append('blob',blob);

          defaultAjaxBinary(formDatabArgArr,"/inventory/save/php/registerBinary.php").then(function(data){
                // ページ繊維
                //location.href="/inventory/save/html/complete.html";
            },function(){
                //location.href="/inventory/save/html/error.html";
            });
        }
}
