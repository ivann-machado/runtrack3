<?php
$conn = new mysqli("localhost", "root", "", "livreor");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query("SELECT * FROM utilisateurs");
//send json
$users = [];
while ($row = $result->fetch_assoc()) {
	$users[] = $row;
}
header('Content-Type: application/json');
echo json_encode($users);
$conn->close();
?>