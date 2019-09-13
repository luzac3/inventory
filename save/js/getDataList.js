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

            argArr = {
                tableName:"T_INVENTORY_MSTR"
                ,sql:{
                    tagNo:inventoryArr["tagNo"]
                    ,name:inventoryArr["name"]
                    ,color:inventoryArr["color"]
                    ,base64:base64
                    ,type:inventoryArr["type"]
                    ,buyDate:inventoryArr["buyDate"]
                    ,price:inventoryArr["price"]
                    ,unit:inventoryArr["unit"]
                    ,count:inventoryArr["count"]
                    ,discountFlg:inventoryArr["discountFlg"]
                    ,discountKind:inventoryArr["discountKind"]
                    ,discountRate:inventoryArr["discountRate"]
                    ,buyPlace:inventoryArr["buyPlace"]
                    ,leftItem:inventoryArr["leftItem"]
                    ,storage:inventoryArr["storage"]
                    ,registerDate:"Date"
                    ,updateDate:"Date"
                }
                ,url:inventoryArr["buyURL"]
            };

            defaultAjax(argArr,"/inventory/save/php/register.php").then(function(data){
                // ページ繊維
                location.href="/inventory/save/html/complete.html";
            },function(){
                location.href="/inventory/save/html/error.html";
            });
        }
}
