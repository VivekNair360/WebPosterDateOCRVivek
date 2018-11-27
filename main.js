let inputURL = "https://www.canada.ca/content/canadasite/en/revenue-agency/corporate/security/protect-yourself-against-fraud/sample-text-message/_jcr_content/par/div_0_2/col_2/img_0_0/image.img.jpg/1494475181975.jpg";
let jsonString = "";
let dateString = "";
window.onload = () => {
    document.getElementById("url-submit").addEventListener("click", () => {
        inputURL = document.getElementById("image-URL").value;
        console.log(`INPUTURL: ${inputURL}`);
        processImage();
    });

}

function processImage() {
    let subscriptionKey = "d7b7af3c073944baabc31ddd2a4be7a6";

    // You must use the same Azure region in your REST API method as you used to
    // get your subscription keys. For example, if you got your subscription keys
    // from the West US region, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the West Central US region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    let uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr";

    // Request parameters.
    let params = {
        "language": "en",
        "detectOrientation": "true"
    };

    // Display the image.
    let sourceImageUrl = inputURL;

    // document.getElementById("inputImage").value;
    // document.querySelector("#sourceImage").src = sourceImageUrl;

    // Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
<<<<<<< Updated upstream
        getWords(data);
=======
        let s = JSON.stringify(data, null, 2);
        jsonString = s;
        console.log(`JSON: ${s}`);
>>>>>>> Stashed changes
    })

    .done(function(s) {
        // Retrieve date from JSON string and show on webpage.
        var i;
        for(i = 0; i < jsonString.length - 7; i++) {
            //"[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]"
            var j = 0;
            if (jsonString.substring(i, i + 8)
            .match('[0-9][0-9]\\.[0-9][0-9]\\.[0-9][0-9]')) {
                // var j = 0;
                dateString += jsonString.substring(i, i + 8);
                j++;
                
            }
        }
        console.log(j);
        if (dateString == "") {
            console.log("This String is empty");
        } else {
            console.log(dateString);
        }
        
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};

function getWords(data) {
    let sentenceArr;
    data.regions.forEach( element => {
        element.lines.forEach( line => {
            let sentence;
            line.words.forEach( word => {
                console.log(word.text);
                sentence.push(word.text);
            })
            sentenceArr.push(sentence);
            console.log("\n");
        });
    });
    return sentenceArr;
}