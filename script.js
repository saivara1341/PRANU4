var initial = 60000; // Initial time in milliseconds (1 minute)
var count = initial;
var counter;
var initialMillis;

function timer() {
	if (count <= 0) {
		gameOver();
		clearInterval(counter);
		return;
	}

	var current = Date.now();
	count -= current - initialMillis;
	initialMillis = current;
	displayCount(count);
}

function displayCount(count) {
	var res = count / 1000;
	document.getElementById("timer").innerHTML = res.toFixed(2);
}

$("#startBtn, #restartBtn").on("click", function () {
	clearInterval(counter);
	initialMillis = Date.now();
	counter = setInterval(timer, 1);
	$(".intro").hide();
	startGame();
});

$("#stop").on("click", function () {
	clearInterval(counter);
});

$("#reset").on("click", function () {
	clearInterval(counter);
	count = initial;
	displayCount(count);
	initialMillis = Date.now();
	counter = setInterval(timer, 1);
});

displayCount(initial);

// Quotes with corresponding films
var quotesAndFilms = [
	{ quote: "7386501382", film: "How do I contact you?" },
];

// Alphabet & letters
var alphabet = "0123456789qwertyuiopasdfghjklzxcvbnm";3
var numbers = ""
var letters = document.querySelector(".letters");
var usedLetters = [];
var displayUsedLetters = document.querySelector(".usedLetters");

// Word
var secretWord = document.querySelector(".secretWord");
let randomQuote;
let randomFilm;
let wordLength;

// Progress
let correctGuesses;
let incorrectGuesses;
var gameFinish = document.querySelector(".gameFinish");

function getRandomQuote() {
	var randomIndex = Math.floor(Math.random() * quotesAndFilms.length);
	randomQuote = quotesAndFilms[randomIndex].quote;
	randomFilm = quotesAndFilms[randomIndex].film;
	document.querySelector(
		".hint"
	).innerHTML = `Enter the Password - Hint: ${randomFilm}`;
	hideWord(randomQuote);
}

function startGame() {
	// Reset variables
	correctGuesses = 0;
	incorrectGuesses = 0;
	usedLetters = [];
	wordLength = 0;
	count = initial; // Reset timer

	// Reset HTML Content
	gameFinish.style.display = "none";
	secretWord.innerHTML = "";
	letters.innerHTML = "";
	displayUsedLetters.innerHTML = "";
	displayCount(count); // Reset displayed count

	// Create letter divs with alphabet
	for (var i = 0; i < alphabet.length; i++) {
		let letterDiv = document.createElement("div");
		letterDiv.className = "letter";
		letterDiv.innerHTML = alphabet[i];
		letters.append(letterDiv);
	}
	getRandomQuote();

	// Show necessary elements
	$("#timer, .letters").show();
	$(".img-mask-win, .img-mask-loose").hide();
	$(".correct-quote").hide(); // Hide the correct quote element when starting a new game
}

function hideWord(randomQuote) {
	for (var i = 0; i < randomQuote.length; i++) {
		let char = document.createElement("span");
		char.className = "char";
		char.innerHTML = randomQuote[i] === " " ? " " : "_";
		if (randomQuote[i] !== " ") wordLength++;
		secretWord.append(char);
	}
}

function checkChar(char) {
	if (usedLetters.includes(char.toLowerCase())) {
		console.log("You already used this letter");
		return;
	}

	usedLetters.push(char.toLowerCase());
	var usedLetter = document.createElement("div");
	usedLetter.className = "usedLetter";
	usedLetter.innerHTML = char;
	displayUsedLetters.append(usedLetter);

	if (!randomQuote.toLowerCase().includes(char.toLowerCase())) {
		incorrectGuesses++;
		drawPenalty();
		checkWin();
	} else {
		for (var i = 0; i < randomQuote.length; i++) {
			if (randomQuote[i].toLowerCase() === char.toLowerCase()) {
				correctGuesses++;
				checkWin();
				document.querySelectorAll(".char")[i].innerHTML = randomQuote[i];
			}
		}
	}
}
function checkWin() {
	var finishText = document.querySelector(".finishText");
	if (correctGuesses === wordLength) {
		finishText.innerHTML = "HAPPY BIRTHDAY PRANAV! On your special day, I want to express my heartfelt gratitude for having you in my life. Your unwavering belief gives me strength, and your kindness reflects a mother’s love and Whenever I'm with you, I feel cherished. I always wana say that Just Embrace your beauty like a flower, spreading lavender grace with your vibrant personality. Though our memories may be few, they have created endless feelings. Stay focused on your dreams, knowing I’ll always be there for you, no matter what the situation is. Let’s begin the 19th edition of your life, filled with infinite adventures and new experiences waiting to unfold! Have a fabulous day!";
		gameFinish.style.display = "flex";
		$("#timer, .letters").hide();
		$(".magic-word").hide();
		$(".img-mask-win").show();
		$("#question1").hide();
		clearInterval(counter);
	}
}

function drawPenalty() {
	const penaltyTime = 5000;

	count -= penaltyTime;
	initialMillis = Date.now();
	counter = setInterval(timer, 1);
	$("#fiveSec").fadeIn().delay(100).fadeOut();
}

$(letters).on("click", function (e) {
	if (alphabet.includes(e.target.innerHTML)) {
		checkChar(e.target.innerHTML);
		e.target.style.opacity = "0.3";
	}
});

$(document).ready(function () {
	$(".letter").on("click", function () {
		$(this).css("opacity", "0.3");
	});
	$("#startBtn, #restartBtn").on("click", function () {
		$(".intro").hide();
		$("#question1").show();
	});
	$(".img-mask-win, .img-mask-loose, #fiveSec").hide();
});
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.finishText');
    const text = "Your text goes here.";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Adjust typing speed here (in milliseconds)
        }
    }

    typeWriter();
});

startGame();