// イベント列挙
function getDataList(){
        if(this.value=="register"){

            let inventoryArr = {};
            let sqlJoinnerArr = [];

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let nodeListLen = nodeList.length;

            for(let i=0; i < nodeListLen; i++){
                if(nodeList[i].Name == "discountFlg" && !nodeList[i].checked){
                    continue;
                }
                inventoryArr[nodeList[i].id] = nodeList[i].value;
            }

            // 画像データ取得
            let ext = storager.get("ext");
            let canvas = document.getElementById("canvas");
            let imageType = "image/" + ext;
            let base64 = canvas.toDataURL(imageType);

            let blob = base64toBlob(base64,imageType);

            argArr = {
                tableName:"T_CNTNT"
                ,sql:{
                    tagNo:inventoryArr["tagNo"]
                    ,name:inventoryArr["name"]
                    ,color:inventoryArr["color"]
                    ,blob:blob
                    ,type:inventoryArr["type"]
                    ,buyDate:inventoryArr["buyDate"]
                    ,price:inventoryArr["price"]
                    ,count:inventoryArr["count"]
                    ,other:inventoryArr["other"]
                    ,discountKind:inventoryArr["discountKind"]
                    ,discountRate:inventoryArr["discountRate"]
                    ,buyPlace:inventoryArr["buyPlace"]
                    ,leftItem:inventoryArr["leftItem"]
                    ,storage:inventoryArr["storage"]
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
