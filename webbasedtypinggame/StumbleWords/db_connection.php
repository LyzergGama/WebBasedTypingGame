<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "typing_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function registerUser($username, $password) {
    global $conn;

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function loginUser($username, $password) {
    global $conn;

    $sql = "SELECT id, password FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row["password"];

        if (password_verify($password, $hashedPassword)) {
            return true;
        } else {
            return "Incorrect password";
        }
    } else {
        return "User not found";
    }
}

function updateWPM($username, $wpm) {
    global $conn;

    // Assuming you have a 'scores' table with columns 'id', 'username', and 'wpm'
    $sql = "UPDATE scores SET wpm=$wpm WHERE username='$username'";

    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else {
        // If the update fails, try inserting a new record
        $sqlInsert = "INSERT INTO scores (username, wpm) VALUES ('$username', $wpm)";

        if ($conn->query($sqlInsert) === TRUE) {
            echo "Success";
        } else {
            // Provide more specific error messages
            if ($conn->errno == 1062) {  // MySQL error code for duplicate entry
                echo "Username '$username' already has a record. Failed to update.";
            } else {
                echo "Error: " . $sqlInsert . "<br>" . $conn->error;
            }
        }
    }
}


$conn->close();
?>