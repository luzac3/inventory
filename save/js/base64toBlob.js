function base64toBlob(base64,imageType){
    const BIN = atob(base64.replace(/^.*,/, ''));
    const BUFFER = new Uint8Array(BIN.length);
    for(let i = 0; i < BIN.length; i++){
        BUFFER[i] = BIN.charCodeAt(i);
    }
    const blob = new Blob(
        [BUFFER.buffer]
        ,{type: imageType}
    );
    return blob;
}
