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

function setDataTable() {
    let reqObj = createXMLHttpObject();
    reqObj.open("GET", "https://raw.githubusercontent.com/adehikmatfr/TWPS3_ajax_js/master/data.xml", true);
    reqObj.onreadystatechange = function () {
        if (reqObj.readyState == 4) {
            if (reqObj.status == 200) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(reqObj.responseText, "text/xml");
        
                const contact = xmlDoc.querySelector("contact");
        
                const nama = contact.querySelector("nama").textContent;
                const alamat = contact.querySelector("alamat").textContent;
                const mobile = contact.querySelector("phone[type='mobile']").textContent;
                const home = contact.querySelector("phone[type='home']").textContent;
                const office = contact.querySelector("phone[type='office']").textContent;
                const email = contact.querySelector("email").textContent;
        
                const tableBody = document.getElementById("table-body");
        
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${nama}</td>
                    <td>${alamat}</td>
                    <td>${mobile}</td>
                    <td>${home}</td>
                    <td>${office}</td>
                    <td>${email}</td>
                `;
        
                tableBody.appendChild(newRow);
                changeInnerHTMLContent('Data Has Loaded');
            } else {
                changeInnerHTMLContent('Loading..');
            }
        } else if (reqObj.readyState == 3) {
            changeInnerHTMLContent('Loading...');
        }
    };

    reqObj.send(null);
}

