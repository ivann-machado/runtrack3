function showhide() {
	let article = document.getElementById("article");
	if (!article) {
		article = document.createElement("article");
		article.id = "article";
		article.innerHTML = 'L\'important n\'est pas la chute, mais l\'atterrissage.';
		document.body.appendChild(article);
	}
	else {
		if (article.style.display === "none") {
			article.style.display = "block";
		} else {
			article.style.display = "none";
		}
	}
}

window.addEventListener("load", function() {
	document.getElementById("button").onclick = showhide;
});