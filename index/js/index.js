// イベント列挙
window.onload=function(){
  let tagNo = document.getElementById("tagNo").className;

  // base64データ取得
  call_stored("getBase64",[tagNo]).then(function(base64){
      // 非同期なので後から表示される
      setPict(base64);
  },function(){
    //error;
  });

}
