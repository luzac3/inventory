function setPict(blob){
  let img = new Image();
  img.onload = function(){
    drawCanvas(
      img
      ,document.getElementById("canvasParent")
      ,document.getElementById("canvas")
      ,document.getElementById("DLCanvas")
    );
  }
  let url = window.URL || window.webkitURL;
  img.src = url.createObjectURL(blob);
}
