window.onload = function(){
    //const INPUT_FILE = document.getElementById("files");
    //const INPUT_FLG = document.getElementsByClassName("input_flg");
    //const INPUT_BUTTON = document.getElementsByClassName("input_button");
    //const UPLOAD_PICT = document.getElementById("uploadPict");
    //const USER_DATA = document.getElementsByClassName("userData");

    //INPUT_BUTTON.addEventListener("change", selectUser, false);
    //UPLOAD_PICT.addEventListener("click", saveCanvas, false);
    elemEventSetter(
      document.getElementById("files")
      ,"change"
      ,pictReader
    );

    elemEventSetter(
      document.getElementsByTagName("button")
      ,"click"
      ,getDataList
    }
}
