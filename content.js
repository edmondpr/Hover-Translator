//document.body.style.background = 'red';
console.log("In the content script");

// var newElList = document.getElementsByClassName("story-heading");
// for (var i = 0; i < newElList.length; i++) {
// 	newElList[i].innerHTML = "Phil is the BEST";
// }

// var anotherList = document.getElementsByTagName("li");

// for (var i = 0; i < anotherList.length; i++) {
	// anotherList[i].innerHTML = "Phil";
// }

// Adapted from accepted solution on: 
//http://stackoverflow.com/questions/2444430/how-to-get-a-word-under-cursor-using-javascript
$('p, h1, h2, h3').each(function() {
    var $this = $(this);
    console.log(this.nodeName);
    $this.html($this.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
});

// bind to each span
var SAVED;
var APIKey = "SPOFF"

$('p span, h1 span, h2 span, h3 span').hover(function() {
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