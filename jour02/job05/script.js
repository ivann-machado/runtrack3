window.addEventListener("load", function() {
	window.addEventListener("scroll", function() {
		const footer = document.getElementById("footer");
		let scrollTop = window.scrollY;
		let docHeight = document.documentElement.scrollHeight - window.innerHeight;
		let scrollPercent = (scrollTop / docHeight) * 100;
		footer.innerText = Math.trunc(scrollPercent) + "%";
		footer.style.background = "linear-gradient(to right, greenyellow " + scrollPercent + "%, #ccc " + scrollPercent + "%)";
	});
});