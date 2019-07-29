const cards = document.querySelectorAll('.memory-card');

/*when the player clicks the card we have to know if itis 1st or 2nd card that he clicks
so we can perform the matching logic*/
let hasFlippedCard = false;  

let firstCard, secondCard;

function flip() {
	/*console.log('Caramba! It freakin works!');
	console.log(this); we check what this refers to here*/
	this.classList.add('flip');

	if(!hasFlippedCard) {
	//if hasFlippedCard is false it means its the 1st time the player has clicked the card
		hasFlippedCard = true;
		firstCard = this;//if hasFlippedCard is set to false, it means the player is clicking on the first card
	/*console.log({hasFlippedCard, firstCard});*/
		} else {
			//second click
			hasFlippedCard = false;
			secondCard = this;//if hasFlippedCard is set to true, the player is clicking on the second card
			
			/*console.log({firstCard, secondCard});we checked if we have a click on both cards*/
		//now we have to check if the two clicked cards match:
/*The data-* attribute gives us the ability to embed custom data attributes on all HTML elements.
  The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any Ajax calls or server-side database queries).*/
		//I access my data attribute value with dataset object:
			/*console.log(firstCard.dataset.animal);
			console.log(secondCard.dataset.animal);*/
		

/* !!! now that we can identify the cards we can check if the
dataset.animal of the 1st and 2nd card are the same. If they are the same,
we are gonna remove the event listener from the cards to prevent them from being clicked again
and if they are not the same we are gonna flip them back. If the cards match, make their shadows 
green for a while or scale em or some shit like that*/
		if(firstCard.dataset.animal === secondCard.dataset.animal) {
	//it's a match!
			firstCard.removeEventListener('click', flip);
			secondCard.removeEventListener('click', flip);
 			} else {
				//if its not a match we remove the flip class from the card
				//when I clicked the card it immediately removed the flip class so I did not even see it being flipped. 
				//That is why I had to set Timeout with 1500ms delay-enough time to see the flipping
				setTimeout(() => {
					firstCard.classList.remove('flip');
					secondCard.classList.remove('flip');
				}, 1500);
			}
			
		}
}

cards.forEach(card => card.addEventListener('click', flip));