function setPict(base64){
  let image = new Image();
  image.onload = function(){
    drawPict(image);
  }
  image.src = base64;
}
