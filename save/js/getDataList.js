// イベント列挙
function getDataList(){
        if(this.value=="register"){

            let cntntArr = {};
            let sqlJoinnerArr = [];

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let nodeListLen = nodeList.length;

            for(let i=0; i < nodeListLen; i++){
                if(nodeList[i].Name == "discountFlg" && !nodeList[i].checked){
                    continue;
                }
                cntntArr[nodeList[i].id] = nodeList[i].value;
            }

            // 画像データ取得
            pictReader.bind(this)();

            // 未修正部分
            argArr = {
                tableName:"T_CNTNT"
                ,sql:[
                    cntntArr["cntntCd"]
                    ,parentEvntCd
                    ,cntntArr["title"]
                    ,cntntArr["status"]
                    ,startDate
                    ,endDate
                    ,gatherDate
                    ,cntntArr["content"]
                    ,cntntArr["remarks"]
                ]
                ,sqlCntntTerms:"CNTNT_CD = '"+cntntArr["cntntCd"]+"'"
                ,tableNameJoinner:"T_CNTNT_JNNR"
                ,sqlJoinner:sqlJoinnerArr
                ,cntntCd:cntntArr["cntntCd"]
            };

            defaultAjax(argArr,"/inventory/eventSet/php/register.php").then(function(data){
                // ページ繊維
                location.href="/inventory/eventSet/html/complete.html";
            },function(){
                location.href="/inventory/eventSet/html/error.html";
            });
        }
}
