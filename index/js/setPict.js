function setPict(base64){
  let image = new Image();
  image.onload = function(){
    // <img>要素としてDOMに追加
    document.getElementById('main').appendChild(img);
    // <img>要素にすることで幅・高さがわかります
    var log = "w=" + img.width + " h=" + img.height;
    document.getElementById('log').value = log;
    //drawPict(image);
  }
  image.src = base64;
}
