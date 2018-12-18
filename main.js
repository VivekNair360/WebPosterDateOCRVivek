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
        getDates(getWords(data));
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
    let sentenceArr = [];
    data.regions.forEach( element => {
        element.lines.forEach( line => {
            let sentence = [];
            line.words.forEach( word => {
                // console.log(word.text);
                sentence.push(word.text);
            })
            sentenceArr.push(sentence);
            // console.log("\n");
        });
    });
    return sentenceArr;
}

function getDates(sentenceArr) {
    var url = "https://faculty.up.edu/ainan/PalindromeDay7102017image2.jpg";

    //let raw = sentenceArr.match("(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})(?=\W)|\b(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))(?=\W)|\b(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?(?=\b)");
    sentenceArr.forEach( element => {
        //console.log(element);
        //rightElements = element.match("[0-9]{1,2}/[0-9]{1,2}/[0-9]{2,4}");
        element.forEach( word => {
            var re = new RegExp("[0-9]{1,2}/[0-9]{1,2}/[0-9]{2,4};");
            if (re.test(word)) {
                // console.log(word.substring(0, word.length - 1));
                document.getElementById("Output").value += word.substring(0, word.length - 1);
            }
            
            // console.log(word);
           /*  word.forEach( part => {
                console.log(part.text);
            }); */
            //let stor = word.match("[0-9]/[0-9]{2}/[0-9]{2};");
            //console.log(stor.input);
            // .match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4};")
        });
    });
}

/*SOME NOTES:
    1) If Github pages says 404 Site Not Found, try pushing the code again.
     */