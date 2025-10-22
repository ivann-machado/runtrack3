let counter = 0;
function addone() {
	counter++;
	document.getElementById("compteur").innerText = counter;
}

window.addEventListener("load", function() {
	document.getElementById("button").onclick = addone;
});