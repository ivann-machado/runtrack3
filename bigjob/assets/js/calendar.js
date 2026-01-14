function getCurrentUser() {
	return JSON.parse(localStorage.getItem('currentUser'));
}

function renderUserHistory() {
	const user = getCurrentUser();
	if (!user) return;
	const data = getData();
	const tbody = document.querySelector('#userHistoryTable tbody');
	if (!tbody) return;
	tbody.innerHTML = '';

	const userRequests = data.requests.filter(r => r.userEmail === user.email);
	userRequests.sort((a, b) => b.date.localeCompare(a.date));

	userRequests.forEach(req => {
		const tr = document.createElement('tr');
		const dateObj = new Date(req.date);
		const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
		const displayDate = dateObj.toLocaleDateString('fr-FR', options);
		const formattedDate = displayDate.charAt(0).toUpperCase() + displayDate.slice(1);

		tr.innerHTML = `
      <td>${formattedDate}</td>
      <td><span class="badge ${req.status === 'accepted' ? 'green white-text' : (req.status === 'rejected' ? 'red white-text' : 'orange white-text')}">${req.status}</span></td>
    `;
		tbody.appendChild(tr);
	});
}

function initCalendar() {
	const dateInput = document.getElementById('presenceDate');
	const requestBtn = document.getElementById('requestBtn');
	const messageBox = document.getElementById('messageBox');

	if (!dateInput || !requestBtn) return;

	const user = getCurrentUser();
	if (user && (user.role === 'admin' || user.role === 'moderator')) {
		dateInput.disabled = true;
		requestBtn.disabled = true;
		if (messageBox) {
			messageBox.style.display = 'block';
			messageBox.textContent = 'Les administrateurs et modérateurs ne peuvent pas demander de présence.';
			messageBox.className = 'card-panel orange lighten-4';
		}
		return;
	}

	let lastConfirmedDate = null;

	const picker = M.Datepicker.init(dateInput, {
		format: 'dddd d mmmm yyyy',
		minDate: new Date(),
		autoClose: false,
		firstDay: 1,
		i18n: {
			cancel: 'Annuler',
			done: 'Ok',
			months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
			weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
			weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		},
		onOpen: function () {
			if (!dateInput.value) {
				lastConfirmedDate = null;
			}
			this.date = lastConfirmedDate;
			setTimeout(() => updateDatepickerHeader(this), 0);
		},
		onDraw: function () {
			updateDatepickerHeader(this);
		},
		onSelect: function () {
			updateDatepickerHeader(this);
		}
	});

	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('datepicker-done')) {
			const instance = M.Datepicker.getInstance(dateInput);
			if (instance) {
				lastConfirmedDate = instance.date;
			}
		}
	});

	function updateDatepickerHeader(instance) {
		const headerDate = instance.date || new Date();
		const options = { weekday: 'short', day: 'numeric', month: 'short' };
		let formatted = headerDate.toLocaleDateString('fr-FR', options);
		formatted = formatted.replace(/\./g, '').replace(/,/g, '');
		const parts = formatted.split(' ');

		if (parts.length >= 3) {
			const day = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
			const date = parts[1];
			const month = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
			formatted = `${day} ${date} ${month}`;
		}

		const dateText = document.querySelector('.datepicker-date-display .date-text');
		if (dateText) dateText.textContent = formatted;
	}

	requestBtn.addEventListener('click', () => {
		const instance = M.Datepicker.getInstance(dateInput);
		if (!instance.date) {
			M.toast({ html: 'Veuillez sélectionner une date.' });
			return;
		}

		const d = instance.date;
		const offset = d.getTimezoneOffset() * 60000;
		const isoDate = new Date(d.getTime() - offset).toISOString().split('T')[0];

		const todayStr = new Date().toISOString().split('T')[0];
		if (isoDate < todayStr) {
			M.toast({ html: 'Vous ne pouvez pas demander une date passée.' });
			return;
		}

		const user = getCurrentUser();
		if (!user) {
			M.toast({ html: 'Vous devez être connecté.' });
			return;
		}
		const data = getData();
		const existing = data.requests.find(r => r.userEmail === user.email && r.date === isoDate);
		if (existing) {
			M.toast({ html: 'Vous avez déjà fait une demande pour cette date.' });
			return;
		}
		const newRequest = {
			userEmail: user.email,
			userName: user.name,
			date: isoDate,
			status: 'pending'
		};
		data.requests.push(newRequest);
		setData(data);
		renderUserHistory();
		M.toast({ html: 'Demande envoyée.' });
	});
}

document.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById('presenceDate')) {
		initCalendar();
		renderUserHistory();
	}
});