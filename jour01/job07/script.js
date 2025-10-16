
function workDay(date) {
	const publicHolidays = ['2020-01-01', '2020-04-13', '2020-05-01', '2020-05-08', '2020-05-21', '2020-06-01', '2020-07-14', '2020-08-15', '2020-11-01', '2020-11-11', '2020-12-25'];
	const day = date.getDay();
	const dateString = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

	if (day === 0 || day === 6) {
		console.log('Non, ' + dateString + ' est un week-end.');
		return;
	}

	const dateISO = date.toISOString().split('T')[0];
	if (publicHolidays.includes(dateISO)) {
		console.log('Non, ' + dateString + ' est un jour férié.');
		return;
	}

	console.log('Oui, ' + dateString + ' est un jour travaillé.');
}

workDay(new Date('2020-01-01'));
workDay(new Date('2020-10-04'));
workDay(new Date('2020-10-05'));