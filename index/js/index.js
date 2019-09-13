// イベント列挙
window.onload=function(){
  let tagNo = document.getElementById("tagNo").className;

  // base64データ取得
  let base64 = call_stored("getBase64",[tagNo]);
  // 非同期なので後から表示される
  setPict(base64);
}
