// イベント列挙
window.onload=function(){
    let button = document.getElementsByTagName("button");
    // ボタン押下時
    elemEventSetter(button,"click",function(){
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

            defaultAjax(argArr,"/timeKeeper/eventSet/php/register.php").then(function(data){
                // ページ繊維
                location.href="/timeKeeper/eventSet/html/complete.html";
            },function(){
                location.href="/timeKeeper/eventSet/html/error.html";
            });
        }
    });
}