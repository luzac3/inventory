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

  // wrapperのサイズをキャンバスにあわせる
  wrapper.style.width = (document.getElementById("previewCanvas").clientWidth + 30) + "px";
  wrapper.style.height = (document.getElementById("previewCanvas").clientHeight + 50) + "px";
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
  parentNode.getElementsByClassName("canvasScreen")[0].style.width = document.getElementById("previewCanvas").clientWidth + "px";
  parentNode.getElementsByClassName("canvasScreen")[0].style.height = document.getElementById("previewCanvas").clientHeight + "px";

  // 親ウィンドウのサイズも合わせる
  document.getElementById("topDiv").style.width = (document.getElementById("previewCanvas").clientWidth + 34) + "px";
  document.getElementById("topDiv").style.height = (document.getElementById("previewCanvas").clientHeight + 54) + "px";
  document.getElementById("topDiv").style.borderRadius = "10px";
  
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
