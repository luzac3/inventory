// イベント列挙
window.onload=function(){
  let tagNo = document.getElementById("tagNo").className;

  let type = "image/" + document.getElementById("canvas").className;

  getBlob(tagNo,type).then(function(blob){
    setPict(blob);
  });

  elemEventSetter(
    document.getElementsByClassName("canvasScreen")
    ,"click"
    ,function(){
      topWindow();

      getBlob(tagNo,type).then(function(blob){
          let img = new Image();
          img.onload = function(){
            setPreview(
              document.getElementById("topDiv")
              ,img
            );
          }
          let url = window.URL || window.webkitURL;
          img.src = url.createObjectURL(blob);
      });
    }
    ,null
  );
}
