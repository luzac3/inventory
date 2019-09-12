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

            // 未修正部分
            argArr = {
                tableName:"T_CNTNT"
                ,sql:[
                    inventoryArr["tagNo"]
                    ,inventoryArr["name"]
                    ,inventoryArr["color"]
                    ,blob
                    ,inventoryArr["type"]
                    ,inventoryArr["buyDate"]
                    ,inventoryArr["price"]
                    ,inventoryArr["count"]
                    ,inventoryArr["other"]
                    ,inventoryArr["discountKind"]
                    ,inventoryArr["discountRate"]
                    ,inventoryArr["buyPlace"]
                    ,inventoryArr["leftItem"]
                    ,inventoryArr["storage"]
                ]
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
