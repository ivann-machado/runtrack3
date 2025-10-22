function jsonValueKey(jsonString, key) {
	const object = JSON.parse(jsonString);
	return object[key];
}
const jsonString = '{"name": "La Plateforme_", "address": "8 rue d\'hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019"}';

console.log(jsonValueKey(jsonString, 'city'));