function drawCanvas(image, parent, canvas, canvasSave=null){
    let imageWidth = image.naturalWidth;
    let imageHeight = image.naturalHeight;

    const PARENT = parent;
    const CANVAS = canvas;
    const CTX = CANVAS.getContext("2d");

    let drawSpaceWidth = parseInt(window.getComputedStyle(PARENT).getPropertyValue('width'));
    let drawSpaceHeight = parseInt(window.getComputedStyle(PARENT).getPropertyValue('height'));

    CTX.fillStyle = "gray";
    CTX.fillRect(0,0,drawSpaceWidth,drawSpaceHeight);

    let drawWidth = 0;
    let drawHeight = 0;

    if(imageWidth / drawSpaceWidth > imageHeight / drawSpaceHeight){
      drawWidth = drawSpaceWidth;
      drawHeight = imageHeight * (drawSpaceWidth / imageWidth);
    }else{
      drawHeight = drawSpaceHeight;
      drawWidth = imageWidth * (drawSpaceHeight / imageHeight);
    }

    CANVAS.width = drawWidth;
    CANVAS.height = drawHeight;
    CANVAS.style.top = (parseInt(drawSpaceHeight) - parseInt(drawHeight)) / 2 + "px";
    CANVAS.style.left = (parseInt(drawSpaceWidth) - parseInt(drawWidth)) / 2 + "px";

    CTX.drawImage(
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


    if(canvasSave){
      const CANVAS_SAVE = canvasSave;
      const CTX_SAVE = CANVAS_SAVE.getContext("2d");

      CTX_SAVE.fillStyle = "gray";
      CTX_SAVE.fillRect(0,0,imageWidth,imageHeight);

      CANVAS_SAVE.width = imageWidth;
      CANVAS_SAVE.height = imageHeight;

      CTX_SAVE.drawImage(image,0,0);
    }

}
