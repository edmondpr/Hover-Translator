var APIKey = "SPOOF";
$('p, h1, h2, h3').each(function() {
    console.log("splitting")
    var descendants = this.getElementsByTagName("*"); // Get all descendants

    // If a link is present, don't split into spans
    
    if (this.nodeName == "A") {
        $(this).attr('title', "Cannot translate link");    
        return;
    }

    for (var i = 0; i < descendants.length; i++) {
        if (descendants[i].nodeName == "A") {
            $(this).attr('title', "Cannot translate link");
            return;
        }
    }

    // Thank you:
    // http://stackoverflow.com/questions/2444430/how-to-get-a-word-under-cursor-using-javascript
    $(this).html($(this).text().replace(/\b(\S+)\b/g, "<span>$1</span>"));
});

$('p span, h1 span, h2 span, h3 span').hover(function(){
    // translate
    var currentElement = $(this);
    var reqTrans = new XMLHttpRequest();
    var urlTrans = "https://translate.yandex.net/api/v1.5/tr/translate?key=" + APIKey + "&lang=de-en&text=" + $(this).html();
    reqTrans.onreadystatechange = function() {
        //console.log(reqTrans.status);
        if (reqTrans.readyState == 4) {

            var xmlResponseTrans = reqTrans.responseXML;
            var newText = xmlResponseTrans.childNodes[0].textContent;

            // Only render tooltip if the text is different
            if (newText != currentElement.html()) {
                currentElement.attr('title', newText);
            } else {
                currentElement.attr('title', "translation not found");
            }
        }
    }
    reqTrans.open("GET", urlTrans, true);
    reqTrans.setRequestHeader('Content-Type', 'text/xml');
    reqTrans.send();

});
