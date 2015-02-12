console.log("HELLO WORLD");

function wasClicked() {
	console.log("I was cliked!!");
	var newURL = "https://translate.yandex.com/"
	chrome.tabs.create({url : newURL});
}

var linkToYandex = document.getElementById("Yandex");
linkToYandex.addEventListener("click", wasClicked, false);