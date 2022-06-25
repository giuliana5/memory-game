const gameContainer = document.getElementById("game");

const COLORS = [
  "#CDF5F6",
  "#EFF9DA",
  "#F9EBDF",
  "#F9D8D6",
  "#D6CDEA",
  "#CDF5F6",
  "#EFF9DA",
  "#F9EBDF",
  "#F9D8D6",
  "#D6CDEA"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// track number of cards selected & pairs matched
let clicks = 0;
let matched = 0;

let lastEvent;

// TODO: Implement this function!
function handleCardClick(event) {
  clicks ++
  event.target.style.backgroundColor = event.target.classList;

  // evaluate if the cards match
  if (clicks === 2) {

    // remove background color
    if (event.target.className !== lastEvent.className) {
      let cards = document.querySelectorAll("div div");
      for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click", handleCardClick);}

      // show cards for a second and reset
      setTimeout(function () {
        event.target.style.backgroundColor = "white";
        lastEvent.style.backgroundColor = "white";
        for (let j = 0; j < cards.length; j++) {
          cards[j].addEventListener("click", handleCardClick);
      }}, 1000);
      } else {

      // prevent the matched card from changing
      event.target.removeEventListener("click", handleCardClick);
      lastEvent.removeEventListener("click", handleCardClick);

      // disable to prevent adding an event
      event.target.setAttribute("value", "disabled");
      lastEvent.setAttribute("value", "disabled");
      matched +=2;
      gameOver(matched);
    }

    // reset number of cards selected
    clicks = 0
  } else {
    lastEvent = event.target
    event.target.removeEventListener("click", handleCardClick);
  }
}

// refresh page when all cards are matched
function gameOver(num) {
  if (num === 10) {
    location.reload();
  }
}

// add event to restart game
const restart = document.getElementById("restart");
restart.addEventListener("click", function(event) {
  location.reload();
})

// when the DOM loads
createDivsForColors(shuffledColors);
