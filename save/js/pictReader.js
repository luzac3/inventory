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
            let imageWidth = image.naturalWidth;
            let imageHeight = image.naturalHeight;

            const parent = document.getElementById("canvasParent");
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const canvasSave = document.getElementById("canvasSave");
            const ctxSave = canvasSave.getContext("2d");

            let drawSpaceWidth = parseInt(window.getComputedStyle(parent).getPropertyValue('width'));
            let drawSpaceHeight = parseInt(window.getComputedStyle(parent).getPropertyValue('height'));

            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,drawSpaceWidth,drawSpaceHeight);

            ctxSave.fillStyle = "gray";
            ctxSave.fillRect(0,0,imageWidth,imageHeight);

            let drawWidth = 0;
            let drawHeight = 0;

            if(imageWidth / drawSpaceWidth > imageHeight / drawSpaceHeight){
              drawWidth = drawSpaceWidth;
              drawHeight = imageHeight * (drawSpaceWidth / imageWidth);
            }else{
              drawHeight = drawSpaceHeight;
              drawWidth = imageWidth * (drawSpaceHeight / imageHeight);
            }

            canvasSave.width = imageWidth;
            canvasSave.height = imageHeight;

            canvas.width = drawWidth;
            canvas.height = drawHeight;

            ctx.drawImage(
              image
              ,0
              ,0
              ,imageWidth
              ,imageHeight
              ,0
              ,0
              ,drawWidth
              ,drawHeight
            );


            ctxSave.drawImage(image,0,0);

            storager.set("ext",ext);
            storager.set("fileName",fileName);
        }
        image.src = thisImage.target.result;
    }
    reader.readAsDataURL(file);
}
