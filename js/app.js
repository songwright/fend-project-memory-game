/*
 * Create a list that holds all of your cards
 */

const cardList = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const openCardList = []; // A list of the two cards current turned face up
let clickCount = 0; // A count of the number of clicks since the last pair result
let moveNumber = 0; // A count of the number of moves made
let stars = 3; // The number of stars based on moves made
let clock = document.getElementsByTagName('time')[0], // Timer variables
    seconds = 0,
    minutes = 0,
    t;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
function deckOfCards () {
    const deckList = document.getElementById("deckList");
    for (let i=0;i<16;i++) {
        const line = document.createElement("li"); // Create a line item.
        const faCard = document.createElement("i"); // Create a Font Awesome element.
        const cardID = 'card' + i.toString(); // Create a unique id for a Font Awesome Element.
        deckList.appendChild(line); // Put the line item into the deck.
        line.className = "card"; // Make the line item a card.
        line.appendChild(faCard); // Put a Font Awesome element into each card.
        faCard.id = cardID; // Give each Font Awesome element a unique id to enable symbol change effect.
    }
}

// loop through each card and create its HTML and assign card symbols to cards in the deck.
function assignCards() {
    for (let i=0;i<16;i++){
        const cardID = 'card' + i.toString();
        const cardSymbol = document.getElementById(cardID);
        cardSymbol.className = cardList[i];
    }
}

deckOfCards();
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
    shuffle(cardList); //Reshuffle the deck.
    assignCards(); // Assign symbols to the cards.
    allCardsDown(); // Turn all the cards down.
    moveNumber = 0; // Reset the number of moves to zero.
    document.getElementById("moveCounter").innerText = 0; // Reset the move count display to 0.
    document.getElementById("star2").className = "fa fa-star"; //Reset the stars.
    document.getElementById("star3").className = "fa fa-star";
    stars = 3;
    stopClock(); // Reset the timer.
    clearClock();
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

// Click on a card to open it.
document.addEventListener('click', function(event){
    const clickedOnCard = event.target;
    if (clickedOnCard.className === "card" && clickCount < 2) { // Restrict the event listener to act on only 2 cards.
        clickCount +=1;
        showCard(event); // Show the card.
        addCard(event); // Add the card to the list of open cards.
        checkMatch(event); // Check for a match.
    } else if (clickedOnCard.className === "fa fa-repeat") { // The listener also works on the reset button.
        restart();
    }
});

// Show the card.
function showCard(evt){
    let clickedOnCell = evt.target;
    clickedOnCell.className = "card open";
}

// Add the card to the list of open cards.
function addCard(evt){
    const clickedOnCard = evt.target;
    openCardList.push(clickedOnCard.firstElementChild.id); // Put the id of the card in the list of open cards.
}

// Check for a match.
function checkMatch(){
    if (openCardList.length === 2) {
        const card1symbol = document.getElementById(openCardList[0]).className;
        const card2symbol = document.getElementById(openCardList[1]).className;
        if (card1symbol === card2symbol) {
            setTimeout(moveSucceed, 500); // The symbols match. Call moveSucceed().
        } else {
            setTimeout(moveFail, 500); // The symbols do not match. Call moveFail().
        }
        moveCounter(); // Increment the move counter.
        starNumber(); // Check the number of moves to update the number of stars.
        if (moveNumber === 1) { // Start the timer.
            timer();
        }
    }
}

// Change the matching cards to the card match style.
function moveSucceed () {
    const match1 = document.getElementById(openCardList[0]); // Get the first card in the list of open cards.
    const match2 = document.getElementById(openCardList[1]); // Get the first second in the list of open cards.
    const symbolList = ["fa fa-smile-o", "fa fa-thumbs-up", "fa fa-heart"];
    // Choose a random success symbol.
    randomIndex = Math.floor(Math.random() * 3);
    let successSymbol = symbolList[randomIndex];
    // Change the symbols to a success symbol.
    match1.className = successSymbol;
    match2.className = successSymbol;
    match1.parentElement.className = "card match";
    match2.parentElement.className = "card match";
    setTimeout(lockCards, 1000); // Wait for transitions to finish.
}

//  Lock the cards in open position if they match.
function lockCards () {
    const match1 = document.getElementById(openCardList[0]); // Get the first card in the list of open cards.
    const match2 = document.getElementById(openCardList[1]); // Get the first second in the list of open cards.
    const cardListIndex1 = openCardList[0].slice(4); // Get the index number of the first card's id.
    const cardListIndex2 = openCardList[1].slice(4); // Get the index number of the second card's id.
    // Return the symbols to their original values from cardList.
    match1.className = cardList[cardListIndex1];
    match2.className = cardList[cardListIndex2];
    openCardList.splice(0,2); // Reset openCardList.
    clickCount = 0; // Reset the click count.
    finalScore(); // Check for the victory condition.
}

// Display failed move style.
function moveFail () {
    const mismatch1 = document.getElementById(openCardList[0]);
    const mismatch2 = document.getElementById(openCardList[1]);
    const symbolList = ["fa fa-frown-o", "fa fa-ban", "fa fa-thumbs-o-down"];
    randomIndex = Math.floor(Math.random() * 3);
    const failureSymbol = symbolList[randomIndex];
    // Change the symbols to failure symbols.
    mismatch1.className = failureSymbol;
    mismatch2.className = failureSymbol;
    mismatch1.parentElement.className = "card fail";
    mismatch2.parentElement.className = "card fail";
    setTimeout(faceCardsDown, 1000); // Wait for card fail and card transition to finish.
}

// Cards are turned face down.
function faceCardsDown () {
    const mismatch1 = document.getElementById(openCardList[0]); // Get the first card in the list of open cards.
    const mismatch2 = document.getElementById(openCardList[1]); // Get the first second in the list of open cards.
    const cardListIndex1 = openCardList[0].slice(4); // Get the index number of the first card's id.
    const cardListIndex2 = openCardList[1].slice(4); // Get the index number of the second card's id.
    // Return the symbols to their original values from cardList.
    mismatch1.className = cardList[cardListIndex1];
    mismatch2.className = cardList[cardListIndex2];
    // Turn the cards face down.
    mismatch1.parentElement.className = "card";
    mismatch2.parentElement.className = "card";
    openCardList.splice(0,2); // Reset the open card list.
    clickCount = 0; // Reset the click count.
}

// Increment the move counter and display it on the page.
function moveCounter () {
    moveNumber +=1;
    const moveSpan = document.getElementById("moveCounter");
    moveSpan.innerText = moveNumber;
}

// Update the stars.
function starNumber() {
    if (moveNumber > 16) {
        document.getElementById("star3").className = "fa fa-star-o"; // Remove a star if there are more than 16 moves.
        stars = 2;
    }
if (moveNumber > 32) {
    document.getElementById("star2").className = "fa fa-star-o"; // Remove another star if there are more than 32 moves.
    stars = 1;
    }
}

// Display final score message when all the cards match.
function finalScore () {
    const cardMatches = document.getElementsByClassName("match");
      if (cardMatches.length === 16) {
          const victoryPopUp = document.getElementById("PopUp");
          stopClock();
          document.getElementById("moveScore").innerHTML = moveNumber;
          document.getElementById("starScore").innerHTML = stars;
          document.getElementById("gameTime").innerHTML = `${minutes} minutes and ${seconds} seconds`;
          if (moveNumber > 32) {
              document.getElementById("starPluralState").innerHTML = "star";
          };
          victoryPopUp.style.display = "block";
      }
}

// Restart the game when the final score button is clicked.
function playAgain () {
    document.getElementById("PopUp").style.display = "none";
    restart();
}

// Timer functions based on a timer by Daniel Hug https://jsfiddle.net/Daniel_Hug/pvk6p/
function tick() {
    seconds +=1;
    if (seconds >= 60) { // The hexigesimal number base for seconds converts them to minutes at 60 seconds.
        seconds = 0;
        minutes +=1;
    }
    clock.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(tick, 1000);
}

function stopClock () {
    clearTimeout(t);
}

function clearClock () {
    clock.textContent = "00:00";
        seconds = 0; minutes = 0;
}
