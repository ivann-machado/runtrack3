window.addEventListener('load', function() {
	let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]; //up, up, down, down, left, right, left, right, B, A, start
	let userInput = [];
	let timeout;
	let bodyStyle = document.body.style;
	document.addEventListener('keydown', function(event) {
		let keyCode = event.keyCode;
		let pos = userInput.length;
		if (keyCode === konamiCode[pos]) {
			bodyStyle.backgroundColor = '#FFD700';
			userInput.push(keyCode);
			if (userInput.length > konamiCode.length) {
				userInput.shift();
			}
			if (userInput.toString() === konamiCode.toString()) {
				bodyStyle.backgroundColor = '#0062ff';
				console.log('Konami Code');
				userInput = [];
				clearTimeout(timeout);
			}
			else {
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					userInput = [];
					bodyStyle.backgroundColor = '#f0f0f0';
				}, 1500);
			}
		}
		else {
			userInput = [];
			bodyStyle.backgroundColor = '#f0f0f0';
			clearTimeout(timeout);
		}
	});
});