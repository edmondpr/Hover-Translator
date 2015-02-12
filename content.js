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
$('p').each(function() {
    var $this = $(this);
    $this.html($this.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
});

// bind to each span
var SAVED;
$('p span').mousedown(
    function() {
    	SAVED = $(this).html();
    	$(this).html("<span>PHIL</span>");
    }
 );
$('p span').mouseup(
	function() {
		$(this).html("<span>" + SAVED + "</span>");
	}
);