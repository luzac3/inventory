/**
 * 画面の全面にウィンドウを表示し、下画面のクリックを防ぐ
 * オブジェクトを追加する場合はtopDivに追加していく
 * 外画面をクリックして閉じるかどうかは設定による
 */
function topWindow(outerClickClose=false){
  const BODY = document.getElementsByTagName("body")[0];

  if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
      // Webkit系（Safari, Chrome, iOS）、IE5はbody要素
      documentElement = document.body;
  } else {
      // IE（6以上）、Firefox、Operaはhtml要素
      documentElement = document.documentElement;
  }
  // スクロール位置の取得
  let getTopPosition  = documentElement.scrollTop;
  let getLeftPosition = documentElement.scrollLeft;

  let topCover = document.createElement("div");
  topCover.id="topCover";
  topCover.style.zIndex = 10;
  topCover.style.position = "absolute";
  topCover.style.backgroundColor = "#000000";
  topCover.style.opacity = 0.3;
  topCover.style.width = (window.parent.screen.width + 100) + "px";
  topCover.style.height = (window.parent.screen.height + 100) + "px";
  topCover.style.top = -50 + "px";
  topCover.style.left = -50 + "px";
  topCover.style.overflow = "hidden";
  BODY.prepend(topCover);
  // top leftの位置を取得し、それより遠くに配置する
  // overflowはhidden

  let topDiv = document.createElement("div");
  topDiv.id="topDiv";
  topDiv.style.zIndex = 11;
  topDiv.style.position = "absolute";
  topDiv.style.width = window.innerWidth * 0.9 + "px";
  topDiv.style.height = window.innerHeight * 0.9 + "px";
  topDiv.style.left = (getLeftPosition + (window.innerWidth / 20)) + "px";
  topDiv.style.top =  (getTopPosition + (window.innerHeight / 20)) + "px";
  topDiv.style.overflow = "hidden";
  BODY.prepend(topDiv);

  BODY.style.overflow = "hidden";
  document.getElementsByTagName("html")[0].style.overflow = "hidden";

  if(outerClickClose){
    elemEventSetter(
      document.getElementById("topCover")
      ,"click"
      ,function(){
        closeWindow();
      }
      ,null
    )
  }
}

function closeWindow(){
  let topCover = document.getElementById("topCover");
  let topDiv = document.getElementById("topDiv");

  // 子要素をすべて削除
  while (topCover.firstChild){
    topCover.removeChild(topCover.firstChild);
  }

  // 子要素をすべて削除
  while (topCover.firstChild){
    topDiv.removeChild(topDiv.firstChild);
  }

  // 自分を削除
  topCover.parentNode.removeChild(topCover);


  // 自分を削除
  topDiv.parentNode.removeChild(topDiv);
}
