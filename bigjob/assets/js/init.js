function initializeData() {
	if (!localStorage.getItem('data')) {
		fetch('data.json')
			.then(response => response.json())
			.then(json => {
				localStorage.setItem('data', JSON.stringify(json));
				console.log('Data initialized in localStorage');
			})
			.catch(err => console.error('Failed to load data.json:', err));
	}
}

document.addEventListener('DOMContentLoaded', () => {
	initializeData();
});