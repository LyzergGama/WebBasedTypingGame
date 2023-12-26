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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="SWstyle.css">
    <link rel="shortcut icon" href="./Assets/logo.png"/>
    <title>StumbleWords</title>
    <audio id="correctSound" src="Assets/correctsfx.mp3"></audio>

     <style>

        
        /* Add the provided styles here */
        #leaderboard-container {
            background-color: rgba(255, 255, 255, 0.8); /* Adjust the last value (alpha) for transparency */
            padding: 20px;
            border-radius: 10px; /* Optional: Add border-radius for rounded corners */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle box shadow */
        }

        #leaderboard-container table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        #leaderboard-container th,
        #leaderboard-container td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        #leaderboard-container th {
            background-color: #f2f2f2;
        }

        #leaderboard-container tr:hover {
            background-color: #f5f5f5;
        }

    </style>
    <script>
        function goToMainMenuSW() {
            window.location.href = '../mainmenu.html';
        }
    </script>
</head>
<body>
    <div id="menu-container" class="container">
        <img src="./Assets/logo.png" width="600" height="300">
        <div id="difficulty-container">
            <label for="difficulty-slider" style="font-size: 30px;">Difficulty Level:</label>
            <input type="range" id="difficulty-slider" min="1" max="3" value="1">
            <span id="difficulty-level" style="font-size: 30px;">Easy</span>
        </div>
        <div id="menu-options">
            <button onclick="startGame()">Start Game</button>
            <button onclick="showLeaderboard()">Leaderboard</button>
            <button onclick="showHowToPlay()">How to Play</button>
            <button id="back-button-mainmenu" onclick="goToMainMenuSW()">Back to Menu</button>
        </div>
    </div>

    <div id="game-container" class="container">
        <progress id="progress-bar" value="0" max="100"></progress>
        <span id="progress-percentage">0%</span>
        <div id="word-display"></div>
        <input type="text" id="user-input" placeholder="Start typing...">
        <p id="live-wpm">WPM: 0.00</p>
        <div class="button-container">
            <button id="restart-button">Restart Game</button>
            <button id="back-button">Back to Menu</button>
        </div>
        <p id="result-message"></p>
    </div>

    <div id="leaderboard-container" class="container">
        <h2>Leaderboard</h2>
        <table border="1">
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>WPM</th>
            </tr>
        
            <?php
            if ($result && $result->num_rows > 0) {
                $rank = 1;
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>{$rank}</td>";
                    echo "<td>{$row['username']}</td>";
                    echo "<td>{$row['wpm']}</td>";
                    echo "</tr>";
                    $rank++;
                }
            } else {
                echo "<tr><td colspan='3'>No data available</td></tr>";
            }
            ?>
        </table>
        <button onclick="hideLeaderboard()">Close Leaderboard</button>
    </div>

    <div id="how-to-play-container" class="container">
        <h2>How to Play</h2>
        <p>1. Click "Start Game" to begin typing.</p>
        <p>2. Type the displayed words as quickly and accurately as possible.</p>
        <p>3. Your typing speed will be calculated at the end of the game.</p>
        <button onclick="hideHowToPlay()">Back to Menu</button>
    </div>

    <script src="SWscript.js"></script>
</body>
</html>

<?php
$conn->close();
?>
