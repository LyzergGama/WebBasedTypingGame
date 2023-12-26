let easyWords = [
    "apple", "banana", "orange", "dog", "cat",
    "house", "sun", "tree", "flower", "happy",
    "jump", "run", "play", "friend", "book",
    "water", "rain", "snow", "bird", "beach",
    "star", "moon", "cloud", "music", "dance",
    "color", "red", "blue", "green", "yellow",
    "eat", "drink", "smile", "laugh", "sleep",
    "game", "fun", "park", "mountain", "river",
    "fish", "turtle", "bike", "car", "train",
    "ship", "plane", "ball", "shoe", "hat",
    "guitar", "piano", "song", "happy", "sad",
    "kind", "smart", "small", "big", "fast",
    "slow", "old", "new", "hot", "cold",
    "open", "close", "far", "near", "soft",
    "hard", "high", "low", "dark", "light",
    "simple", "complex", "early", "late", "loud",
    "quiet", "deep", "shallow", "empty", "full",
    "hard", "easy", "smooth", "rough", "thick",
    "thin", "wild", "tame", "clean", "dirty",
    "busy", "calm", "empty", "full", "first",
    "last", "good", "bad", "right", "wrong"
];
let mediumWords = [
    "javascript", "programming", "html", "css", "developer",
    "computer", "database", "algorithm", "framework", "software",
    "network", "server", "frontend", "backend", "fullstack",
    "interface", "responsive", "mobile", "web", "design",
    "application", "code", "function", "variable", "loop",
    "conditional", "array", "object", "class", "method",
    "parameter", "argument", "return", "promise", "asynchronous",
    "synchronous", "event", "listener", "callback", "debug",
    "error", "console", "log", "git", "repository",
    "branch", "merge", "pull", "push", "commit",
    "version", "control", "repository", "branch", "merge",
    "pull", "push", "commit", "version", "control",
    "docker", "container", "image", "cloud", "deployment",
    "scaling", "performance", "optimization", "security", "authentication",
    "authorization", "encryption", "decryption", "token", "session",
    "authentication", "authorization", "encryption", "decryption", "token",
    "session", "frontend", "backend", "framework", "library",
    "dependency", "package", "module", "npm", "yarn",
    "build", "test", "debug", "deployment", "continuous",
    "integration", "deployment", "testing", "unit", "integration",
    "end-to-end", "database", "sql", "nosql", "query",
    "index", "table", "document", "collection", "schema",
    "CRUD", "create", "read", "update", "delete"
];

let hardWords = [
    "encyclopedia", "philanthropy", "ubiquitous", "onomatopoeia",
    "disestablishmentarianism", "antidisestablishmentarianism", "pneumonoultramicroscopicsilicovolcanoconiosis", "supercalifragilisticexpialidocious", "sesquipedalian",
    "epistemology", "existentialism", "solipsism", "ontological", "metaphysical",
    "teleological", "heuristic", "hermeneutics", "anomaly", "paradigm",
    "chiaroscuro", "zeitgeist", "juxtaposition", "serendipity", "quixotic",
    "sycophant", "chutzpah", "cacophony", "cognitive", "psychosomatic",
    "psychoanalysis", "behaviorism", "phenomenology", "panopticon", "cartesian",
    "transcendental", "sublime", "nihilism", "postmodernism", "deconstruction",
    "intersubjectivity", "epiphenomenalism", "antinomianism", "antipositivism", "antirealism",
    "surreptitious", "perspicacious", "recalcitrant", "facetious", "obfuscate",
    "circumlocution", "incontrovertible", "meretricious", "proclivity", "quintessential",
    "verisimilitude", "vituperative", "exacerbate", "intransigent", "pellucid",
    "abstruse", "inscrutable", "anachronistic", "obdurate", "pusillanimous",
    "recidivism", "belligerent", "capitulate", "disparate", "ephemeral",
    "facetious", "idiosyncrasy", "inimitable", "juxtapose", "kaleidoscope",
    "labyrinthine", "mellifluous", "nefarious", "obfuscate", "panacea",
    "quintessential", "resilient", "sycophant", "taciturn", "ubiquitous",
    "vexatious", "winsome", "xenophobic", "yeoman", "zenith"
];


let words = [];


const difficultySlider = document.getElementById("difficulty-slider");
const difficultyLevelDisplay = document.getElementById("difficulty-level");

let difficultyLevel = parseInt(difficultySlider.value, 10);

difficultySlider.addEventListener("input", updateDifficultyLevel);

function updateDifficultyLevel() {
    difficultyLevel = parseInt(difficultySlider.value, 10);
    difficultyLevelDisplay.textContent = getDifficultyLabel(difficultyLevel);

    switch (difficultyLevel) {
        case 1:
            words = [...easyWords];
            break;
        case 2:
            words = [...mediumWords];
            break;
        case 3:
            words = [...hardWords];
            break;
        default:
            words = [...mediumWords];
            break;
    }

    shuffleArray(words);
    displayWord();
}

function getDifficultyLabel(level) {
    switch (level) {
        case 1:
            return "Easy";
        case 2:
            return "Medium";
        case 3:
            return "Hard";
        default:
            return "Medium";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentWordIndex = 0;
let startTime;

const menuContainer = document.getElementById("menu-container");
const gameContainer = document.getElementById("game-container");
const howToPlayContainer = document.getElementById("how-to-play-container");

const wordDisplay = document.getElementById("word-display");
const userInput = document.getElementById("user-input");
const resultMessage = document.getElementById("result-message");

const restartButton = document.getElementById("restart-button");
const backButton = document.getElementById("back-button");

restartButton.addEventListener("click", restartGame);
backButton.addEventListener("click", returnToDifficultySelect);

function restartGame() {
    currentWordIndex = 0;
    resultMessage.textContent = "";
    shuffleArray(words);
    displayWord();

    userInput.value = "";
    userInput.focus();

    wordCount = 0;
    startTime = new Date().getTime();

    userInput.addEventListener("input", checkInput);
}

function returnToDifficultySelect() {
    menuContainer.style.display = "flex";
    gameContainer.style.display = "none";
    howToPlayContainer.style.display = "none";
    userInput.removeEventListener("input", checkInput);
}

function startGame() {
    menuContainer.style.display = "none";
    howToPlayContainer.style.display = "none";
    gameContainer.style.display = "flex";

    currentWordIndex = 0;
    resultMessage.textContent = "";
    shuffleArray(words);
     displayWord();


    userInput.value = "";
    userInput.focus();

    wordCount = 0;
    startTime = new Date().getTime();

    setInterval(updateWPM, 1000);
    userInput.removeEventListener("input", checkInput);
    userInput.addEventListener("input", checkInput);
    setInterval(updateLiveWPM, 1000);
}

function displayWord() {
    const targetWord = words[currentWordIndex];
    wordDisplay.innerHTML = '';

    for (let i = 0; i < targetWord.length; i++) {
        const span = document.createElement("span");
        span.textContent = targetWord[i];
        wordDisplay.appendChild(span);
    }
}

const correctSound = document.getElementById("correctSound");

function checkInput() {
    const typedWord = userInput.value.trim();
    const targetWord = words[currentWordIndex];

    for (let i = 0; i < typedWord.length; i++) {
        const span = wordDisplay.children[i];
        const isCorrect = i < targetWord.length && typedWord[i] === targetWord[i];

        span.style.color = isCorrect ? 'green' : 'red';
    }

    if (typedWord === targetWord) {
        currentWordIndex++;
        wordCount++;

        correctSound.play();

        if (wordCount === 25) {
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;
            const wordsPerMinute = (wordCount / totalTime) * 60;

            resultMessage.textContent = `Congratulations! You typed 25 words. Your speed: ${wordsPerMinute.toFixed(2)} WPM.`;

            // Prompt for the username
            const username = prompt("Enter your username:");

            // Send an AJAX request to update the database
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "save_scores.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText); // Log the response for debugging
                }
            };

// Prepare data to send
const data = `username=${encodeURIComponent(username)}&wpm=${encodeURIComponent(wordsPerMinute.toFixed(2))}`;
xhr.send(data);

// Reset the game or show leaderboards, etc.


            userInput.removeEventListener("input", checkInput);
        } else if (currentWordIndex === words.length) {
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;
            const wordsPerMinute = (wordCount / totalTime) * 60;

            resultMessage.textContent = `Congratulations! You typed all words. Your speed: ${wordsPerMinute.toFixed(2)} WPM.`;

            userInput.removeEventListener("input", checkInput);
        } else {
            displayWord();
            userInput.value = "";
            updateProgressBar();
            updateWPM();
        }
    } else {
        // Pause the correct sound effect if it's still playing
        correctSound.pause();
        correctSound.currentTime = 0;
    }

    updateProgressBar();
}

  

function updateProgressBar() {
    const progress = (wordCount / 25) * 100; // Assuming you want to fill the progress bar after 25 words
    const progressBar = document.getElementById("progress-bar");
    progressBar.value = progress;

    const progressPercentage = document.getElementById("progress-percentage");
    progressPercentage.textContent = `${Math.round(progress)}%`;
}


function showHowToPlay() {
    menuContainer.style.display = "none";
    gameContainer.style.display = "none";
    howToPlayContainer.style.display = "flex";
}

function hideHowToPlay() {
    menuContainer.style.display = "flex";
    gameContainer.style.display = "none";
    howToPlayContainer.style.display = "none";
}

function updateWPM(username, wpm) {
    console.log("Calling updateWPM");
    endTime = new Date().getTime();
    const totalTime = (endTime - startTime) / 1000;
    const wordsPerMinute = (wordCount / totalTime) * 60;

    wpmCounter.textContent = `WPM: ${wordsPerMinute.toFixed(2)}`;

    // Send user score to PHP
    updateScore(username, wordsPerMinute);
}

function updateScore(username, wpm) {
    const xhr = new XMLHttpRequest();
    const url = "save_scores.php";
    const params = `username=${username}&wpm=${wpm}`;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText); // Log the server response
        }
    };

    xhr.send(params);
    // Remove the recursive call below, as it's not needed
    // updateScore(username, wordsPerMinute);
}


const liveWPMElement = document.getElementById("live-wpm");

function updateLiveWPM() {
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const liveWPM = (wordCount / elapsedTime) * 60;
    liveWPMElement.textContent = `WPM: ${liveWPM.toFixed(2)}`;
}


function showLeaderboard() {
    document.getElementById('leaderboard-container').style.display = 'flex';
    menuContainer.style.display = 'none';
    gameContainer.style.display = 'none';
    howToPlayContainer.style.display = 'none';
}

function hideLeaderboard() {
    document.getElementById('leaderboard-container').style.display = 'none';
    menuContainer.style.display = 'flex';
    gameContainer.style.display = 'none';
    howToPlayContainer.style.display = 'none';
}

function fetchLeaderboard() {
    // Use AJAX or Fetch API to get leaderboard data from the server
    // Update the leaderboard table dynamically
    fetch("get_leaderboard.php")
        .then(response => response.json())
        .then(data => updateLeaderboardTable(data))
        .catch(error => console.error("Error fetching leaderboard:", error));
}

function updateLeaderboardTable(data) {
    const leaderboardTable = document.getElementById("leaderboard-table");
  
    // Clear existing rows
    leaderboardTable.innerHTML = "";
  
    // Sort the data by WPM in descending order
    data.sort((a, b) => b.wpm - a.wpm);
  
    // Add new rows based on the fetched data
    data.forEach((entry, index) => {
      const row = leaderboardTable.insertRow();
      const rankCell = row.insertCell(0);
      const usernameCell = row.insertCell(1);
      const wpmCell = row.insertCell(2);
  
      rankCell.textContent = index + 1;
      usernameCell.textContent = entry.username;
      wpmCell.textContent = entry.wpm;
    });
  }
  


updateDifficultyLevel();