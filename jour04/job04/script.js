window.addEventListener("load", function() {
	const resultsTable = document.getElementById("results");
	function fetchUsers(users) {
		users.forEach((user) => {
			const userRow = document.createElement("tr");
			userRow.innerHTML = `<td>${user.id}</td><td>${user.nom}</td><td>${user.prenom}</td><td>${user.email}</td>`;
			resultsTable.appendChild(userRow);
		});
	}
	fetch("./users.php").then((res) => res.json()).then((data) => {
		fetchUsers(data);
	});
	document.getElementById('update').addEventListener("click", function(event) {
		console.log("clic");
		resultsTable.innerHTML = "";
		if (users.length === 0) {
			resultsTable.innerHTML = "<tr>Pas de résultat</tr>";
		}
		else {
			fetch("./users.php").then((res) => res.json()).then((data) => {
				fetchUsers(data);
			});
		}
	});
});