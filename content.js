console.log("In the content script");

var APIKey = "SPOOF";
$('p, h1, h2, h3').hover(function() {
    var descendants = this.getElementsByTagName("*"); // Get all descendants

    /* Don't do anythig if a link is present */
    if (this.nodeName == "A") {
        return;
    }

    for (var i = 0; i < descendants.length; i++) {
        if (descendants[i].nodeName == "A") {
            return;
        }
    }
    /*******/

    $(this).html($(this).text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
    $('p span, h1 span, h2 span, h3 span').hover(function(){
        var req = new XMLHttpRequest();
        var url = "https://translate.yandex.net/api/v1.5/tr/translate?key=" + APIKey + "&lang=de-en&text=" + $(this).html();
        req.open("GET", url, false);
        req.setRequestHeader('Content-Type', 'text/xml');
        req.send();
        xmlResponse = req.responseXML;
        var newText = xmlResponse.childNodes['0'].textContent;

        // Only render tooltip if the text is different
        if (newText != $(this).html()) {
            $(this).attr('title', newText);
        }
    });
});