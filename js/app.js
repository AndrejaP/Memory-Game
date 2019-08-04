const cards = document.querySelectorAll('.memory-card');
const movesElem = document.querySelector('.moves');
const modalWindow = document.querySelector('.modal-container');
const timer = document.querySelector('.timer');
let pairsFound = 0;
let moves = 0;
let flippedCard = false;
//if it's not a match, I have to lock the board and wait until it finishes unflipping
let lockBoard = false;
let firstCard, secondCard;
let startGame = false;
let startTime;
let interval;


function flip(currentCard) {
	//if someone clicks beside the card
	if(!currentCard.classList || !currentCard.classList.contains('memory-card')) return;
	if(lockBoard) return;
	if(currentCard === firstCard) return;
	if(currentCard.dataset.matched == 'true') return;
	if(!startGame) {
		startGame = true;
		startTimer();
	}
	currentCard.classList.add('flip');
	
	if(!flippedCard) {
		//first click
		flippedCard = true;
		firstCard = currentCard;
		
	} else {
		//second click
		secondCard = currentCard;
		moves++;
		starRating();
		movesElem.innerText = moves;
		matchingLogic();
	}
}


function matchingLogic() {
	if(firstCard.dataset.animal === secondCard.dataset.animal) {
		//the cards match
		firstCard.dataset.matched = true;
		secondCard.dataset.matched = true;
		resetBoard();
		pairsFound++;
		displayModal();
		
	} else {
		//the cards do not match
		animateCards();
		unflipCards();
	}
}


//wait 600ms until flip is complete
function animateCards() {
	setTimeout(() => {
		if(firstCard) firstCard.firstElementChild.classList.add('animation');
		if(secondCard) secondCard.firstElementChild.classList.add('animation');
	}, 600);
}


function unanimateCards() {
	if(firstCard) firstCard.firstElementChild.classList.remove('animation');
	if(secondCard) secondCard.firstElementChild.classList.remove('animation');
}


//if it's not a match the cards flip back to the starting position:
function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			//unlocks the board after the cards have finished flipping
			resetBoard();
	}, 1500);
}


//I have to, after each round, set 1st and 2nd card to null
function resetBoard() {
	unanimateCards();
	[flippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}


function resetGame() {
	resetBoard();
	[pairsFound, moves] = [0, 0];
	startTime = performance.now();
	movesElem.innerText = 0;
	//fills empty stars
	document.querySelectorAll('.stars li i.far').forEach(star => {
		star.classList.add('fa');
		star.classList.remove('far');
	});
	stopTimer();
	timer.innerText = '00:00';
	if(startGame) {
		unflipAllCars();
		//wait until unflip is complete
		setTimeout(shuffle, 600);
	} else {
		shuffle();
	}
	startGame = false;
	modalWindow.style.display = 'none';
}


//shuffling the cards by modifying the order of the grid items
function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 16);
		card.style.order = randomPos;
	});
}


//we added this to flip the cards back at the end
function unflipAllCars() {
	cards.forEach(card => {
		card.dataset.matched = false;
		card.classList.remove('flip');
	});
}


//after all 8 pairs are found, displays congratulations modal with the game results and stops the timer
function displayModal() {
	if (pairsFound === 8) {
		stopTimer();
		document.querySelector('.time').innerText = duration();
		const starsContainer = document.querySelector('.stars');
		document.querySelector('.star-rating').innerHTML = starsContainer.innerHTML;
		modalWindow.style.display = 'flex';
	}
}


function startTimer() {
	startTime = performance.now();
	interval = setInterval(setTimerText, 1000);
}


function setTimerText() {
	timer.innerText = duration();
}


function stopTimer() {
	if (interval) clearInterval(interval);
	interval = null;
}


function duration() {
	const now = performance.now();
	return new Date(now - startTime).toISOString().slice(14, -5);
}


function starRating () {
	if(moves === 13 || moves === 23) {
		//selects the first filled star
		let star = document.querySelector('.stars li i.fa');
		star.classList.remove('fa');
		star.classList.add('far');
	}
}


document.querySelector('.memory-game').addEventListener('click', function(event) {
	let currentCard = event.target.parentElement;
	flip(currentCard);
});
document.querySelector('button').addEventListener('click', resetGame);
document.querySelector('.restart').addEventListener('click', resetGame);
shuffle();
