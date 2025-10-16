function tri(numbers, order) {
	if (!Array.isArray(numbers) || (order !== 'asc' && order !== 'desc')) {
		return false;
	}
	if (order === 'asc') {
		return numbers.sort((a, b) => a - b);
	}
	else if (order === 'desc') {
		return numbers.sort((a, b) => b - a);
	}
}

console.log(tri(['2', '9', '4'], 'asc'));