console.log("I am Phil!");


function wasClicked() {
	console.log("I was cliked!");
}

var linkToYandex = document.getElementById("Yandex");
linkToYandex.addEventListener("click", wasClicked, false);

