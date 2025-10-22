window.addEventListener('load', function() {
	document.getElementById('button').addEventListener('click', function() {
		fetch('./expression.txt')
			.then(response => response.text())
			.then(response => {
				const content = document.createElement('p');
				content.innerHTML = response;
				document.body.appendChild(content);
			})
			.catch(error => console.error(error));
	});
});