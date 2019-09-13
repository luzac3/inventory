function drawPict(image){
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
}
