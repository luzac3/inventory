function pictReader(){
    const TARGET = this.target;
    const FILES = TARGET.files;

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

            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = imageWidth;
            canvas.height = imageHeight;

            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,100,100);

            ctx.drawImage(image,0,0);

            document.getElementById("ext").classList.add(ext);
            document.getElementById("fileName").classList.add(fileName);
        }
        image.src = thisImage.target.result;
    }
    reader.readAsDataURL(file);
}
