function renderList(listId, items) {
	const ul = document.getElementById(listId);
	if (!ul) return;
	ul.innerHTML = '';
	items.forEach((email, idx) => {
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.textContent = email;

		if (listId === 'adminsList') {
			li.appendChild(document.createTextNode(' (Admin)'));
		} else {
			const removeBtn = document.createElement('button');
			removeBtn.className = 'btn-small red right';
			removeBtn.textContent = 'Supprimer';
			removeBtn.setAttribute('data-email', email);
			removeBtn.setAttribute('data-idx', idx);
			removeBtn.addEventListener('click', () => removeRole(listId, email));
			li.appendChild(removeBtn);
		}
		ul.appendChild(li);
	});
}

function addRole(listId, email) {
	const data = getData();
	if (listId === 'moderatorsList') {
		if (!data.roles.moderators.includes(email)) data.roles.moderators.push(email);
	} else if (listId === 'adminsList') {
		if (!data.roles.admins.includes(email)) data.roles.admins.push(email);
	}
	setData(data);
	renderAll();
}

function removeRole(listId, email) {
	const data = getData();
	if (listId === 'moderatorsList') {
		data.roles.moderators = data.roles.moderators.filter(e => e !== email);
	} else if (listId === 'adminsList') {
		data.roles.admins = data.roles.admins.filter(e => e !== email);
	}
	setData(data);
	renderAll();
}

function renderAll() {
	const data = getData();
	renderList('moderatorsList', data.roles.moderators);
	renderList('adminsList', data.roles.admins);
}

document.addEventListener('DOMContentLoaded', () => {
	const addModBtn = document.getElementById('addModeratorBtn');
	const modInput = document.getElementById('newModeratorEmail');
	if (addModBtn && modInput) {
		addModBtn.addEventListener('click', () => {
			const email = modInput.value.trim();
			if (email) {
				addRole('moderatorsList', email);
				modInput.value = '';
				M.toast({ html: 'Modérateur ajouté' });
			}
		});
	}

	const addAdminBtn = document.getElementById('addAdminBtn');
	const adminInput = document.getElementById('newAdminEmail');
	if (addAdminBtn && adminInput) {
		addAdminBtn.addEventListener('click', () => {
			const email = adminInput.value.trim();
			if (email) {
				addRole('adminsList', email);
				adminInput.value = '';
				M.toast({ html: 'Administrateur ajouté' });
			}
		});
	}

	renderAll();
});