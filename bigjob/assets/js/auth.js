const DOMAIN = "@laplateforme.io";

function getUsers() {
	return getData().users;
}

function setUsers(users) {
	const data = getData();
	data.users = users;
	setData(data);
}

function getCurrentUser() {
	const user = JSON.parse(localStorage.getItem('currentUser'));
	if (!user) return null;
	const data = getData();
	if (data.roles.admins.includes(user.email)) {
		user.role = 'admin';
	} else if (data.roles.moderators.includes(user.email)) {
		user.role = 'moderator';
	} else {
		user.role = 'member';
	}
	return user;
}

function setCurrentUser(user) {
	localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
	localStorage.removeItem('currentUser');
}

function validateDomain(email) {
	return email.endsWith("@laplateforme.io");
}

function checkAccess() {
	const user = getCurrentUser();
	const path = window.location.pathname;
	const fileName = path.substring(path.lastIndexOf('/') + 1);

	if (fileName === '' || fileName === 'index.html') {
		if (user) {
			window.location.href = 'calendrier.html';
			return;
		}
		document.body.style.display = 'block';
		window.dispatchEvent(new Event('resize'));
		return;
	}

	if (!user) {
		window.location.href = 'index.html';
		return;
	}

	if (fileName === 'backoffice.html') {
		if (user.role !== 'moderator' && user.role !== 'admin') {
			window.location.href = 'calendrier.html';
			return;
		}
	}

	if (fileName === 'admin.html') {
		if (user.role !== 'admin') {
			window.location.href = 'calendrier.html';
			return;
		}
	}
	document.body.style.display = 'block';
	window.dispatchEvent(new Event('resize'));
}

function updateNavigation() {
	const user = getCurrentUser();
	const navMobile = document.getElementById('nav-mobile');
	if (!navMobile) return;

	navMobile.innerHTML = '';

	if (user) {
		const links = [];
		links.push({ name: 'Calendrier', url: 'calendrier.html' });

		if (user.role === 'moderator' || user.role === 'admin') {
			links.push({ name: 'Back-office', url: 'backoffice.html' });
		}

		if (user.role === 'admin') {
			links.push({ name: 'Administration', url: 'admin.html' });
		}

		links.forEach(link => {
			const li = document.createElement('li');
			li.innerHTML = `<a href="${link.url}">${link.name}</a>`;
			navMobile.appendChild(li);
		});

		const logoutLi = document.createElement('li');
		logoutLi.innerHTML = `<a href="#" id="logoutBtn">Déconnexion</a>`;
		navMobile.appendChild(logoutLi);

		document.getElementById('logoutBtn').addEventListener('click', logout);
	}
}
function register(event) {
	event.preventDefault();
	const name = document.getElementById('registerName').value.trim();
	const email = document.getElementById('registerEmail').value.trim();
	const password = document.getElementById('registerPassword').value;

	if (!validateDomain(email)) {
		M.toast({ html: `L'email doit se terminer par @laplateforme.io` });
		return;
	}

	const data = getData();
	if (data.users.find(u => u.email === email)) {
		M.toast({ html: "L'utilisateur existe déjà" });
		return;
	}

	const newUser = { name, email, password };
	data.users.push(newUser);
	setData(data);
	setCurrentUser(newUser);
	M.toast({ html: 'Inscription réussie' });
	window.location.href = 'calendrier.html';
}

function login(event) {
	event.preventDefault();
	const email = document.getElementById('loginEmail').value.trim();
	const password = document.getElementById('loginPassword').value;
	const data = getData();
	const user = data.users.find(u => u.email === email && u.password === password);
	if (!user) {
		M.toast({ html: 'Identifiants invalides' });
		return;
	}
	setCurrentUser(user);
	M.toast({ html: 'Connexion réussie' });
	window.location.href = 'calendrier.html';
}

function logout() {
	clearCurrentUser();
	window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
	checkAccess();
	updateNavigation();

	const loginForm = document.getElementById('loginForm');
	if (loginForm) {
		loginForm.addEventListener('submit', login);

		const tabs = document.querySelectorAll('.tabs');
		if (tabs.length > 0) M.Tabs.init(tabs);
	}
	const registerForm = document.getElementById('registerForm');
	if (registerForm) registerForm.addEventListener('submit', register);
});