// Function that creates a bubble next to the input to display error text
function bubble(target, error) {
	let existingBubble = target.parentElement.querySelector(".error-bubble");
	if (existingBubble) {
		existingBubble.remove();
	}
	let bubble = document.createElement("div");
	let rect = target.getBoundingClientRect();
	bubble.className = "error-bubble";
	bubble.textContent = error;
	bubble.style.left = `${rect.right + window.scrollX + 10}px`;
	bubble.style.top = `${rect.top + window.scrollY}px`;
	target.parentElement.appendChild(bubble);

	setTimeout(() => {
		if (bubble.parentElement) {
			bubble.remove();
		}
	}, 3000);
}

window.addEventListener("load", function() {
	let timeout = [];
	let validation = [];
	const tt = 700;
	addEventListener("input", (event) => {
		let target = event.target;
		let id = target.id;
		console.log(timeout);
		clearTimeout(timeout[id]);
		switch(id) {
		case "nom":
		case "prenom":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial";
				if(target.value.length < 3) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Doit contenir au moins 3 caractères");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		case "email":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial";
				if(!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(target.value)) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Adresse email invalide");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		case "pc":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial"
				if(target.value !== target.parentElement.querySelector("#password").value) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Les mots de passe ne correspondent pas");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		case "password":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial";
				if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,}/.test(target.value)) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		case "adresse":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial";
				if(!/^\d+\s[A-z]+\s[A-z]+/.test(target.value)) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Adresse invalide");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		case "cp":
			timeout[id] = setTimeout(() => {
				target.style.borderColor = "initial";
				if(!/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(target.value)) {
					target.style.borderColor = "red";
					validation[id] = false;
					bubble(target, "Code postal invalide");
				}
				else {
					validation[id] = true;
				}
			}, tt);
			break;
		}
	})

	addEventListener("submit", (event) => {
		event.preventDefault();
		let form = event.target;
		let inputs = form.querySelectorAll("input");
		let valid = true;
		setTimeout(() => {
			inputs.forEach((input) => {
				if (input.type !== "submit") {
					if(validation[input.id] === false || !input.value) {
						valid = false;
					}
				}

			});
			if(!valid) {
				bubble(form.querySelector("input[type='submit']"), "Veuillez remplir correctement tous les champs du formulaire.");
			}
			else {
				event.target.submit();
			}
		}, tt);
	});
});