function setPreview(parentNode,img){
  // parentNode内にCanvasのWrapperとCanvasを作り、その中に取得した画像データを描画

  let wrapper = document.createElement("p");
  wrapper.id = "previewCanvasParent";
  wrapper.className = "confirm";
  wrapper.style.position = "absolute";
  wrapper.style.margin = "0";
  wrapper.style.left = "5%";
  wrapper.style.top = "5%";
  wrapper.style.width = "90%";
  wrapper.style.height = "90%";
  parentNode.appendChild(wrapper);

  let screen = document.createElement("span");
  screen.className = "canvasScreen";
  document.getElementById("previewCanvasParent").appendChild(screen);

  let previewCanvas = document.createElement("canvas");
  previewCanvas.id = "previewCanvas";
  document.getElementById("previewCanvasParent").appendChild(previewCanvas);

  drawCanvas(img,wrapper,previewCanvas);

  console.log(document.getElementById("previewCanvas").clientWidth);

  // 現canvas情報を取得
  let canvasWidth = document.getElementById("previewCanvas").clientWidth;
  let canvasHeight = document.getElementById("previewCanvas").clientHeight;
  let canvasTop = window.pageYOffset + document.getElementById("previewCanvas").getBoundingClientRect().top;
  let canvasLeft = window.pageXOffset + document.getElementById("previewCanvas").getBoundingClientRect().left;

  // wrapperのサイズをキャンバスにあわせる
  wrapper.style.width = (canvasWidth + 30) + "px";
  wrapper.style.height = (canvasHeight + 50) + "px";
  wrapper.style.left = "0px";
  wrapper.style.top = "0px";
  wrapper.style.borderStyle = "solid";
  wrapper.style.borderWidth = "2px";
  wrapper.style.borderRadius = "10px";

  // canvasの位置を調整
  document.getElementById("previewCanvas").style.left = "15px";
  document.getElementById("previewCanvas").style.top = "25px";

  // スクリーンをCanvasにあわせる
  parentNode.getElementsByClassName("canvasScreen")[0].style.left = "15px";
  parentNode.getElementsByClassName("canvasScreen")[0].style.top = "25px";
  parentNode.getElementsByClassName("canvasScreen")[0].style.width = canvasWidth + "px";
  parentNode.getElementsByClassName("canvasScreen")[0].style.height = canvasHeight + "px";

  // 親ウィンドウのサイズも合わせる
  document.getElementById("topDiv").style.width = (canvasWidth + 34) + "px";
  document.getElementById("topDiv").style.height = (canvasHeight + 54) + "px";
  document.getElementById("topDiv").style.borderRadius = "10px";
  document.getElementById("topDiv").style.backgroundColor = "#FFFFFF";

  // 親ウィンドウの位置を現wrapper位置へ
  document.getElementById("topDiv").style.top = (window.pageXOffset + canvasTop - 25) + "px";
  document.getElementById("topDiv").style.left = (window.pageYOffset + canvasLeft - 15) + "px";

  let closeButton = document.createElement("button");
  closeButton.id = "previewClose";
  closeButton.value = "previewClose";
  closeButton.textContent  = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "0px";
  closeButton.style.right = "10px";
  document.getElementById("previewCanvasParent").appendChild(closeButton);

  elemEventSetter(
    document.getElementById("previewClose")
    ,"click"
    ,function(){
      closeWindow();
    }
    ,null
  )
}
