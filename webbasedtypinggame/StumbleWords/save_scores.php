<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "typing_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $wpm = $_POST["wpm"];

    // Sanitize input to prevent SQL injection
    $username = mysqli_real_escape_string($conn, $username);
    $wpm = mysqli_real_escape_string($conn, $wpm);

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO scores (username, wpm) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $wpm);

    if ($stmt->execute()) {
        echo "Score saved successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>