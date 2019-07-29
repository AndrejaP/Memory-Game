const cards = document.querySelectorAll('.memory-card');

let pairsFound = 0;

let moves = 0;

let flippedCard = false;
let lockBoard = false; /*if I click on a new card before the previously opened 
cards finished unflipping, it wont open, it crashes the logic, so in case
it's not a match, I have to lock the board and wait until it finishes unflipping'*/
let firstCard, secondCard;
let startTime = performance.now();// do I have to set it to zero or put it elsewhere??
/*const modal = document.querySelector('.modal');*/



function flip(currentCard) {
	if(lockBoard) return; //if lockBoard is true, return from the function-leave the function-w, if not, the rest wont execute
	if(currentCard === firstCard) return;/*if we click twice on the same card, the isMatch will evaluate to true and the event listener
	will be removed & the card will remain flipped. we have to add a condition to avoid that.
   so if it is the 1st card click this variable holds the 1st card but the firstCard variable is still unset?
   so the condition will evaluate to false and the function will be executed normally.
   if it is the second card click than THIS cariable holds the 2nd card and it case that equals the first card
   then it will return from the function?????????????????????????*/
	
	currentCard.classList.add('flip');
	
	if(!flippedCard) {
		//first click
		flippedCard = true;
		firstCard = currentCard;
	} else {
		//second click
		/*flippedCard = false;*/
		secondCard = currentCard;
		moves++;
		starRating();
		document.querySelector('.moves').innerText = moves;
		matchingLogic();
	}
}

//the code in if else blocks is extracted to their own methods
function matchingLogic() { //checkForMatch. It can be shorter if written as a ternary operator
	if(firstCard.dataset.animal === secondCard.dataset.animal) {
		//the cards match
		resetBoard();
		pairsFound++;
		/*animateCards();*/
			//this is the end	
		displayModal();//??????????why here?
		
	} else {
		//the cards do not match
		unflipCards();
	}
}

/*function removeListener() {//disable cards
	firstCard.removeEventListener('click', flip);
	secondCard.removeEventListener('click', flip);

	resetBoard();
}*/

function unflipCards() { //if it's not a match the cards flip back to the starting position
	lockBoard = true;
	
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
		   /* lockBoard = false;//unlocks the board after the cards have been flipped*/
	        resetBoard();//unlocks the board after the cards have finished flipping
	}, 1500);
}
//for our condition to work we have to, after each round, set 1st and 2nd card to null
//let's extract that to a method on its own called resetBoard
function resetBoard() {//ES6 destructuring assignment makes it short and sweet
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
	document.querySelector('.timer'). innerText = "0m 0s";
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
}
/*IIFE-Immediately Invoked Function Expression- we wrap the function
into parentesis and add a pair of parentesis at the end.
IIFE is a function that will be executed right after its definition but then it threw an error when I 
called the shuffle function again*/

document.querySelector('.memory-game').addEventListener('click', function(event) {
	let currentCard = event.target.parentElement;
	flip(currentCard);
});
	
//cards.forEach(card => card.addEventListener('click', flip));


function displayModal() {
	if (pairsFound === 1) {//I can add below: if pairsFound < 8 return but I dont have to, I can put it in one line if <i dont have curly breakckets
		
		document.querySelector('.time').innerText = duration();
		const starsContainer = document.querySelector('.stars');
		document.querySelector('.star-rating').innerHTML = starsContainer.innerHTML;

		document.querySelector('.modal-container').style.display = 'flex';
		resetTimer();
	}
}

//the timer:
var second = 0;
var minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute + "m " + second + "s";
		second++;
		if(second == 60) {
			minute++;
			second = 0;
		}
		if(minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

function moveCounter() {
	moves++
	counter.innterHTML = moves;
//start timer on the first move
	if(moves == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTimer(); 
	}
	
function resetTimer() {
	timer.innerHTML = "0m 0s";
	clearInterval(interval);
}

//TODO make a timer and put it on the screen
//TODO nothing should happen when I click on an open pair or the first card twice
//TODo make it responsive
//looks for tabs and spaces and check indents
//TODO go through udacity styleguide

//var msTime = stopTime -startTime //time in miliseconds
function duration() {
	const stopTime = performance.now();
	return new Date(stopTime - startTime).toISOString().slice(14, -5);
}

/*

// function milliseconds to time
/*function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}
*/

//function time(ms) { return new Date(ms).toISOString().slice(11, -1);} console.log( time(12345 * 1000) );  // "03:25:45.000"


/*displayModal();//if I call it here it will be run when js loads but it will be run only once, it has to be called within a function*/

function starRating () {
	if(moves === 3 || moves === 23) {//it cannot work with > or > than a number because it would cpntinue removing stars with every move
		let star = document.querySelector('.stars li i.fa');
		star.classList.remove('fa');
		star.classList.add('far');
		
		//stars[0].removeChild(stars[0].firstElementChild);
		
		//firstStar.removeChild[0];//an element cannot be removed by itself, it must be done as a child, through the parent
		//let starsUl = document.querySelector('.stars');
		//starsUl.removeChild(starsUl.firstChildElement);
	}
}

 // When the user clicks anywhere outside of the modal, it closes
   /*   window.onclick = function(event) {
        if (event.target !== modal) {
          modal.style.display = "none";
        }
      }
*/
document.querySelector('button').addEventListener('click', resetGame);//can i add here a display: none for the modal?

document.querySelector('.restart').addEventListener('click', resetGame);//keine ahnung

shuffle();
