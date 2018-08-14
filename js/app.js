/*
 * Create a list that holds all of your cards
 */

const cardList = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const openCardList = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cardList);

// loop through each card and create its HTML and assign card symbols to cards in the deck
function assignCards() {
  const cardSymbol = ""
  for (let i=0;i<16;i++){
    const cardID = 'card' + i.toString();
    const cardSymbol = document.getElementById(cardID);
    cardSymbol.className = cardList[i];
  }
}

assignCards();

// Turn all the cards face down.
function allCardsDown() {
  for (let i=0;i<16;i++){
    const cardID = 'card' + i.toString();
    const card = document.getElementById(cardID);
    card.parentElement.className = 'card';
  }
}

// Restart the game.
function restart() {
  shuffle(cardList);
  assignCards();
  allCardsDown();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Click on a card to open it
document.addEventListener('click', function(event){
  const clickedOnCard = event.target;
  if (clickedOnCard.className === 'card') { // Restrict the event listener to only act on cards
    showCard(event);
    addCard(event);
  } else if (clickedOnCard.className === 'fa fa-repeat') { // The listener also works on the reset button.
      restart();
    }
});

// Show the card
function showCard(evt){
  var clickedOnCell = evt.target;
  clickedOnCell.className = 'card open';
}

// Add the card to the list of open cards.
function addCard(evt){
  const clickedOnCard = evt.target;
  openCardList.push(clickedOnCard.firstElementChild.id); // Put the id of the card in the list of open cards.
}
