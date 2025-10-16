function primeNumbersSum(num1, num2) {
	if (isPrime(num1) && isPrime(num2)) {
		return num1 + num2;
	}
	return false;
}

function isPrime(num) {
	if (num <= 1) {
		return false;
	}
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
}

console.log(primeNumbersSum(7, 5));