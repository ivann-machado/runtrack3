window.addEventListener("load", function() {
	let pokemons;
	const resultsTable = document.getElementById("results");
	fetch("./pokemon.json").then((res) => res.json()).then((data) => {
		pokemons = data;
		pokemons.forEach((pokemon) => {
			const pokemonRow = document.createElement("tr");
			pokemonRow.innerHTML = `<td>${pokemon.id}</td><td>${pokemon.name.french}</td><td>${pokemon.type.join(", ")}</td>`;
			resultsTable.appendChild(pokemonRow);
		});
	});
	addEventListener("submit", function(event) {
		event.preventDefault();
		const entries = Object.fromEntries(new FormData(event.target));

		const filteredPokemons = pokemons.filter((pokemon) => {
			return (
				(!entries.id || pokemon.id == entries.id) &&
				(!entries.nom || pokemon.name.french.toLowerCase() == entries.nom.toLowerCase()) &&
				(!entries.type || pokemon.type.includes(entries.type)));
		});
		resultsTable.innerHTML = "";
		if (filteredPokemons.length === 0) {
			resultsTable.innerHTML = "<tr>Pas de résultat</tr>";
		}
		else {
			filteredPokemons.forEach((pokemon) => {
				const pokemonRow = document.createElement("tr");
				pokemonRow.innerHTML = `<td>${pokemon.id}</td><td>${pokemon.name.french}</td><td>${pokemon.type.join(", ")}</td>`;
				resultsTable.appendChild(pokemonRow);
			});
		}
	});
});