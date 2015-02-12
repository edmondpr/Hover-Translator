console.log("In the content script");

var APIKey = "spoff"
$('p, h1, h2, h3').hover(function() {
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