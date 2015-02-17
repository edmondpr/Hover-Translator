console.log("In the content script");

var APIKey = "SPOFF";
$('p, h1, h2, h3').each(function() {
    var descendants = this.getElementsByTagName("*"); // Get all descendants

    // If a link is present, don't split into spans
    if (this.nodeName == "A") {
        return;
    }

    for (var i = 0; i < descendants.length; i++) {
        if (descendants[i].nodeName == "A") {
            return;
        }
    }

    $(this).html($(this).text().replace(/\b(\S+)\b/g, "<span>$1</span>"));
});


$('p span, h1 span, h2 span, h3 span').hover(function(){
    // translate
    console.log($(this).html());
    var reqTrans = new XMLHttpRequest();
    var urlTrans = "https://translate.yandex.net/api/v1.5/tr/translate?key=" + APIKey + "&lang=de-en&text=" + $(this).html();
    reqTrans.open("GET", urlTrans, false);
    reqTrans.setRequestHeader('Content-Type', 'text/xml');
    reqTrans.send();
    var xmlResponseTrans = reqTrans.responseXML;
    var newText = xmlResponseTrans.childNodes[0].textContent;

    // Only render tooltip if the text is different
    if (newText != $(this).html()) {
        $(this).attr('title', newText);
    }
});