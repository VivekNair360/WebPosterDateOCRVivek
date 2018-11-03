function processImage() {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace <Subscription Key> with your valid subscription key.
    let subscriptionKey = "ccae1a162791428293b0863d7ace51ee";

    // You must use the same Azure region in your REST API method as you used to
    // get your subscription keys. For example, if you got your subscription keys
    // from the West US region, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the West Central US region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    let uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr";

    // Request parameters.
    let params = {
        "language": "en",
        "detectOrientation": "true"
    };

    // Display the image.
    let sourceImageUrl = "https://www.canada.ca/content/canadasite/en/revenue-agency/corporate/security/protect-yourself-against-fraud/sample-text-message/_jcr_content/par/div_0_2/col_2/img_0_0/image.img.jpg/1494475181975.jpg";

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
        let s = JSON.stringify(data, null, 2);
        console.log(`JSON: ${s}`);
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