const bladeRunnerQuotes = [
	{ title: "Tears in rain.",
		text: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.",
	footer: "— Roy Batty" },
	{ title: "It's a shame she won't live.",
		text: "But then again, who does?",
	footer: "— Gaff" },
	{ title: "More human than human is our motto.",
		text: "We're in the business of manufacturing futures, Deckard. You're a cop. You're a Blade Runner.",
	footer: "— Eldon Tyrell"  },
	{ title: "Quite an experience to live in fear, isn't it?",
		text: "That's what it is to be a slave.",
	footer: "— Roy Batty"  },
	{ title: "The light that burns twice as bright burns half as long.",
		text: "And you have burned so very, very brightly, Roy.",
	footer: "— Tyrell"  }
];
const pageContent = {
	1: { title: "Lorem",
		text: "<p class=\"lead\">Lorem ipsum</p>",
	footer: "Lorem ipsum" },
	2: { title: "Bonjour, monde!",
		text: "<p class=\"lead\">Il existe plusieurs visions du terme :</p><p class=\"lead\">le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.<br/>Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>",
	footer: "Le sens étendu désigne l'univers dans son ensemble." },
	3: { title: "Ipsum",
		text: "<p class=\"lead\">Ipsum lorem</p>",
	footer: "Ipsum lorem" }
};

function changeToRandomQuote() {
	const randomIndex = Math.floor(Math.random() * bladeRunnerQuotes.length);
	const randomQuote = bladeRunnerQuotes[randomIndex];
	const jumbotron = document.getElementById('jumbotronContent');

	const newHTML = `
			<h2 class="mb-4 display-5">${randomQuote.title}</h2>
			<p class="lead">${randomQuote.text}</p>
		<p class="text-muted border-top pt-2 mt-3">${randomQuote.footer}</p>
	`;

	jumbotron.innerHTML = newHTML;

	document.querySelectorAll('#pageLinks .page-item').forEach(item => {
		item.classList.remove('active');
	});
}

function updatePaginationActiveState(pageNumber) {
	document.querySelectorAll('#pageLinks .page-item').forEach(item => {
		item.classList.remove('active');
	});

	const pageLink = document.querySelector(`#pageLinks a[data-page="${pageNumber}"]`);
	if (pageLink) {
		pageLink.closest('.page-item').classList.add('active');
	}
}

function updateJumbotron(pageNumber) {
	const content = pageContent[pageNumber];
	const jumbotron = document.getElementById('jumbotronContent');

	const newHTML = `
		<h2 class="mb-4 display-5">${content.title}</h2>
		${content.text}
		<p class="text-muted border-top pt-2 mt-3">${content.footer}</p>
	`;

	jumbotron.innerHTML = newHTML;

	updatePaginationActiveState(pageNumber);
}

function handleSidebarClick(event) {
	const clickedItem = event.target.closest('.list-group-item-action');

	if (clickedItem) {
		event.preventDefault();

		document.querySelectorAll('#sidebarList .list-group-item').forEach(item => {
			item.classList.remove('fw-bold', 'active');
			item.removeAttribute('aria-current');
		});

		clickedItem.classList.add('fw-bold', 'active');
		clickedItem.setAttribute('aria-current', 'true');
	}
}

function updateProgress(direction) {
	const progressBar = document.getElementById('progressBar');
	if (!progressBar) return;

	let currentValue = parseInt(progressBar.getAttribute('aria-valuenow'));
	const step = 10;

	if (direction === 'up') {
		currentValue += step;
	}
	else if (direction === 'down') {
		currentValue -= step;
	}

	currentValue = Math.max(0, Math.min(100, currentValue));

	progressBar.style.width = currentValue + '%';
	progressBar.setAttribute('aria-valuenow', currentValue);
}

let keySequence = "";
const targetSequence = "dcg";

function showFormSummaryModal() {
	const login = document.getElementById('login').value;
	const password = document.getElementById('password').value;
	const dogecoin = document.getElementById('dogecoin').value;
	const url = document.getElementById('urlInternet').value;

	const summaryHtml = `
			<ul class="list-unstyled">
				<li><strong>Login:</strong> ${login || '(Vide)'}</li>
				<li><strong>Mot de Passe:</strong> ${password || '(Vide)'}</li>
				<li><strong>Dogecoin:</strong> ${dogecoin || '(Vide)'}</li>
				<li><strong>URL Internet:</strong> ${url || '(Vide)'}</li>
			</ul>
	`;

	document.getElementById('modalSummaryBody').innerHTML = summaryHtml;

	const myModal = new bootstrap.Modal(document.getElementById('summaryModal'));
	myModal.show();
}

function keyHandler(event) {
	const pressedKey = event.key.toLowerCase();

	if (targetSequence.includes(pressedKey)) {
		keySequence += pressedKey;

		if (keySequence.endsWith(targetSequence)) {
			showFormSummaryModal();
			keySequence = "";
		}
	}
	else {
		if (keySequence.length > 0) {
			keySequence = "";
		}
	}
}

function changeSpinnerColor(e) {
	const email = document.getElementById('email').value;
	const password = document.getElementById('passwordBis').value;
	if (email && password) {
		const spinnerColor = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
		const spinner = document.getElementById('loadingSpinner');
		const randomColor = spinnerColor[Math.floor(Math.random() * spinnerColor.length)];
		spinner.className = `spinner-border mx-1 text-${randomColor}`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const paginationList = document.getElementById('pageLinks');
	const rebootButton = document.getElementById('rebootButton');
	const sidebarList = document.getElementById('sidebarList');
	const progressUpButton = document.getElementById('progressUpButton');
	const progressDownButton = document.getElementById('progressDownButton');
	const submitButton = document.getElementById('submitButton');

	paginationList.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target.closest('a');
		const pageNumber = target ? target.getAttribute('data-page') : null;

		if (pageNumber) {
			updateJumbotron(pageNumber);
		}
	});
	rebootButton.addEventListener('click', changeToRandomQuote);
	sidebarList.addEventListener('click', handleSidebarClick);
	progressUpButton.addEventListener('click', () => updateProgress('up'));
	progressDownButton.addEventListener('click', () => updateProgress('down'));
	document.addEventListener('keydown', keyHandler);
	submitButton.addEventListener('click', changeSpinnerColor);

	updateJumbotron(2);
});