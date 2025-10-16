function citation() {
	console.log(document.getElementById("citation").innerHTML);
}

window.addEventListener("load", function() {
	document.getElementById("button").onclick = citation;
});