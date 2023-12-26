<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "typing_game";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch leaderboard data
$sql = "SELECT username, wpm FROM scores ORDER BY wpm DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $leaderboardData = array();

    while ($row = $result->fetch_assoc()) {
        $leaderboardData[] = array(
            'username' => $row['username'],
            'wpm' => $row['wpm']
        );
    }

    // Convert to JSON and output
    header('Content-Type: application/json');
    echo json_encode($leaderboardData);
} else {
    echo json_encode(array()); // Empty array if no data
}

$conn->close();
?>
