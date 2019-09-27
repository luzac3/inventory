function pictReader(event){
    const TARGET = event.target;
    const FILES = TARGET.files;

    // storagerの初期化
    storager.set("ext","");
    storager.set("fileName","");

    let file = FILES[0];

    let fileName = file["name"];
    let size = file["size"];
    let type = file["type"];

    let objectType = type.split("/");
    let ext = objectType[1];

    // 画像データでなければ警告を表示して終了
    if(objectType[0] != "image"){
        alert("画像ファイルを選択してください");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(thisImage){
        let image = new Image();
        image.onload = function(){
          drawCanvas(
            image
            ,document.getElementById("canvasParent")
            ,document.getElementById("canvas")
            ,document.getElementById("canvasSave")
          );

          storager.set("ext",ext);
          storager.set("fileName",fileName);
        }
        image.src = thisImage.target.result;
    }
    reader.readAsDataURL(file);
}
