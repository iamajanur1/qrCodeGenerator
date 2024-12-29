function genQR() {
    var gapi = "https://api.qr-code-generator.com/v1/create?access-token=HKDFMyvDvW4iRRKXtCmSHuQr4q4KGwqnXR6FbkLIOvJR1Kz4bV0QqVSq6aTkPAWC";
    var myimg = document.getElementById("img");
    var mytext = document.getElementById("qrtext").value;
    var mysize = document.getElementById("size").value;

    if (mytext !== "") {
        // Request body for the QR Code API
        var requestData = {
            "qr_code_text": mytext,
            "qr_code_size": mysize,  // e.g. 100, 150, 200, 250, 300, 400
            "qr_code_padding": 10,  // Optional padding
            "qr_code_format": "png" // Image format, can be png, svg, etc.
        };

        fetch(gapi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            myimg.src = data.url;  // Use the returned image URL
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
            alert("Failed to generate QR code.");
        });
    } else {
        alert("Please Enter Text");
    }
}

function downloadImg() {
    var myimg = document.getElementById("img");
    var qrsrc = myimg.src;

    if (qrsrc) {
        var el = document.createElement("a");
        el.setAttribute("href", qrsrc);
        el.setAttribute("download", "qrcode.png"); // Set default filename
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    } else {
        alert("No QR Code generated yet!");
    }
}
