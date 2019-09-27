function getBlob(tagNo,type){
  return new Promise((resolve, reject) => {
    xmlhttp = new XMLHttpRequest();

  	xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4){
        let blob = new Blob([xmlhttp.response], {type : type});
        resolve(blob);
      }
    };

    xmlhttp.open("POST","/inventory/index/php/getBlob.php");
    xmlhttp.responseType = 'blob';
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send("argArr=" + [tagNo]);
  });
}
