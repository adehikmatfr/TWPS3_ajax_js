function createXMLHttpObject() {
    let xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (error) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }

    if (!xmlhttp) {
        alert("Terjadi kesalahan saat pembuatan XMLHttpRequest object!");
    } else {
        alert("XMLHttpRequest berhasil dibuat.");
    }

    return xmlhttp;
}

function changeInnerHTMLContent(text = "Changes") {
    document.getElementById('div-content').innerHTML = text;
}

function requestContent() {
    let reqObj = createXMLHttpObject();
    reqObj.open("GET", "https://adehikmatfr.github.io/minimalis-portofolio/", true);
    reqObj.onreadystatechange = function () {
        if (reqObj.readyState == 4) {
            if (reqObj.status == 200) {
                changeInnerHTMLContent(reqObj.responseText);
            } else {
                changeInnerHTMLContent('Loading..');
            }
        } else if (reqObj.readyState == 3) {
            changeInnerHTMLContent('Loading...');
        }
    };

    reqObj.send(null);
}
