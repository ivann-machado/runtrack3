function getData() {
	const data = JSON.parse(localStorage.getItem('data')) || {};
	if (!data.users) data.users = [];
	if (!data.requests) data.requests = [];
	if (!data.roles) data.roles = { moderators: [], admins: [] };
	return data;
}

function setData(data) {
	localStorage.setItem('data', JSON.stringify(data));
}