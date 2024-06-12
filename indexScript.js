var iframeheight = document.getElementById('idIframe');
console.log(iframeheight)

function frameSizeAjust(){
    document.getElementById('main').height = iframeheight;
}
window.onload = frameSizeAjust();