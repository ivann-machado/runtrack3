<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<script src="script.js"></script>

</head>
<body>
	<form name="pokemon">
		<label for="id">ID</label>
		<input type="text" id="id" name="id">
		<label for="nom">Nom</label>
		<input type="text" id="nom" name="nom">
		<label for="type">Type</label>
		<select id="type" name="type">
			<option value="Normal">Normal</option>
			<option value="Fire">Feu</option>
			<option value="Water">Eau</option>
			<option value="Grass">Plante</option>
			<option value="Electric">Electrik</option>
			<option value="Ice">Glace</option>
			<option value="Fighting">Combat</option>
			<option value="Poison">Poison</option>
			<option value="Ground">Sol</option>
			<option value="Flying">Vol</option>
			<option value="Psychic">Psy</option>
			<option value="Bug">Insecte</option>
			<option value="Rock">Roche</option>
			<option value="Ghost">Spectre</option>
			<option value="Dragon">Dragon</option>
			<option value="Dark">Ténèbres</option>
			<option value="Steel">Acier</option>
			<option value="Fairy">Fée</option>
		</select>
		<input type="submit" value="Trier">
	</form>
	<table border="1" id="pokemonTable">
		<thead>
			<tr>
				<th>ID</th>
				<th>Nom</th>
				<th>Type</th>
			</tr>
		</thead>
		<tbody id="results">
		</tbody>
	</table>
</body>
</html>