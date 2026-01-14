function renderRequests() {
	const data = getData();
	const tbody = document.querySelector('#requestsTable tbody');
	if (!tbody) return;
	tbody.innerHTML = '';

	const now = new Date();
	const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

	data.requests.forEach((req, idx) => {
		const isPast = req.date < todayStr;

		const dateObj = new Date(req.date);
		const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
		const displayDate = dateObj.toLocaleDateString('fr-FR', options);
		const formattedDate = displayDate.charAt(0).toUpperCase() + displayDate.slice(1);

		const tr = document.createElement('tr');
		tr.innerHTML = `
      <td>${req.userName}</td>
      <td>${formattedDate}</td>
      <td><span class="badge ${req.status === 'accepted' ? 'green white-text' : (req.status === 'rejected' ? 'red white-text' : 'orange white-text')}">${req.status}</span></td>
      <td>
        ${(req.status === 'pending' && !isPast) ? `
          <button class="btn-small green waves-effect" data-idx="${idx}" data-action="accept">Accepter</button>
          <button class="btn-small red waves-effect" data-idx="${idx}" data-action="reject">Refuser</button>
        ` : (isPast ? '<span class="grey-text">Décision verrouillée</span>' : '—')}
      </td>
    `;
		tbody.appendChild(tr);
	});

	tbody.querySelectorAll('button').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const idx = e.target.getAttribute('data-idx');
			const action = e.target.getAttribute('data-action');
			updateRequestStatus(idx, action);
		});
	});
}

function updateRequestStatus(index, action) {
	const data = getData();
	const req = data.requests[index];
	if (!req) return;
	if (action === 'accept') {
		req.status = 'accepted';
		M.toast({ html: `Demande de ${req.userName} acceptée` });
	} else if (action === 'reject') {
		req.status = 'rejected';
		M.toast({ html: `Demande de ${req.userName} refusée` });
	}
	setData(data);
	renderRequests();
}

document.addEventListener('DOMContentLoaded', () => {
	renderRequests();
});