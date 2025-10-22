window.addEventListener("load", function() {
	const keylogger = document.getElementById("keylogger");
	document.addEventListener("keydown", function(event) {
		const key = event.key;
		if (key.length === 1 && key.match(/[a-zA-Z]/i)) {
			keylogger.value += key;
		}
	});
});