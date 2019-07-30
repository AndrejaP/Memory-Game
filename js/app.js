const cards = document.querySelectorAll('.memory-card');
let pairsFound = 0;
let moves = 0;
let flippedCard = false;
//if it's not a match, I have to lock the board and wait until it finishes unflipping:
let lockBoard = false; 
let firstCard, secondCard;
let startTime = performance.now();
var timer = document.querySelector(".timer");
var interval;

function flip(currentCard) {
	if(lockBoard) return; //return from the function-leave the function-if lockBoard is true
	if(currentCard === firstCard) return;//if it is the second card click than THIS variable-currentCard- holds the 2nd card 
	if(currentCard.dataset.matched == true) return;//MUST THIS ONE BE ABOVE THE ONE BELOW TO RETURN BEFORE IT FLIPS`?
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
		document.querySelector('.moves').innerText = moves;
		matchingLogic();
	}
}

function matchingLogic() {
	if(firstCard.dataset.animal === secondCard.dataset.animal) {
		//the cards match
		resetBoard();
		pairsFound++;
		displayModal();

		/*firstCard.dataset.matched = true;
		secondCard.dataset.matched = true;
		/*animateCards(); to move left right when its not a match*/
		
	} else {
		//the cards do not match
		unflipCards();
	}
}

//if it's not a match the cards flip back to the starting position:
function unflipCards() { 
	lockBoard = true;
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
	        resetBoard();//unlocks the board after the cards have finished flipping
	}, 1500);
}
//for our condition to work we have to, after each round, set 1st and 2nd card to null
//ES6 destructuring assignment makes it short and sweet:
function resetBoard() {
	[flippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function resetGame() {
	resetBoard();
	[pairsFound, moves] = [0, 0];
	startTime = performance.now();
	document.querySelector('.moves').innerText = moves;
	document.querySelectorAll('.stars li i.far').forEach(star => {
		star.classList.add('fa');
		star.classList.remove('far');
	});
	shuffle();
	document.querySelector('.modal-container').style.display = 'none';
}
/*animateCards {
	document.querySelectorAll('.memory-card').style.animate = 
}*/

/*shuffling the cards with the flexbox property ORDER-it is a flex items property which defaults to 0
-every flex item belongs to the same group and then they will be grouped by source order.
If u assign a different integer to the order property items will get ordred first by
ascending order according to the value in the order property and then by source order*/
function shuffle() {
	cards.forEach(card => {//iterating through our deck of cards
		let randomPos = Math.floor(Math.random() * 16);//generating a random number between 0 and one
		card.classList.remove('flip');//we added this to flip the cards back to skulls at the end.
		card.style.order = randomPos;//and assigning it to each card

	});
	startTimer();
}

document.querySelector('.memory-game').addEventListener('click', function(event) {
	let currentCard = event.target.parentElement;
	flip(currentCard);
});
	
//cards.forEach(card => card.addEventListener('click', flip));

function displayModal() {
	if (pairsFound === 8) { //I can add below: if pairsFound < 8 return but I dont have to, I can put it in one line if <i dont have curly breakckets
		
		document.querySelector('.time').innerText = duration();
		const starsContainer = document.querySelector('.stars');
		document.querySelector('.star-rating').innerHTML = starsContainer.innerHTML;
		document.querySelector('.modal-container').style.display = 'flex';
		resetTimer();
	}
}

//the timer:
function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = duration();
	}, 1000);
}

function resetTimer() {
	clearInterval(interval);
}

//TODO look for tabs and spaces and check indents
//TODO go through udacity styleguide

function duration() {
	const stopTime = performance.now();
	return new Date(stopTime - startTime).toISOString().slice(14, -5);
}

function starRating () {
	if(moves === 3 || moves === 23) {//it cannot work with > or < than, because it would cpntinue removing stars with every move
		let star = document.querySelector('.stars li i.fa');
		star.classList.remove('fa');
		star.classList.add('far');
		}
}

document.querySelector('button').addEventListener('click', resetGame);
document.querySelector('.restart').addEventListener('click', resetGame);
shuffle();
