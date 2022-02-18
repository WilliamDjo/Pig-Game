'use strict';

/**
 * Flowcharts are a representation of anything that can happen in an application
 * This is a very nice way to visualize what happens in the application
 * and its a very good guide for us to implement the application in code
 */

/**
 * When we're selecting an element by it's id and not class
 * instead of using querySelector, we can use getElementById
 * getElementById is slightly faster than querySelector
 */

/**
 * classList.toggle(className) will add the class if it isnt there and it will remove it if its there
 */

// Use .src to change whicb image will be displayed

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// For initializing
const scores = document.querySelectorAll('.score');
const currentScores = document.querySelectorAll('.current-score');
const players = document.querySelectorAll('.player');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = 0;
  }
  for (let i = 0; i < currentScores.length; i++) {
    currentScores[i].textContent = 0;
  }
  for (let i = 0; i < players.length; i++) {
    players[i].classList.remove('player--winner');
  }
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  removeButtons(false);
};

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function removeButtons(boolean) {
  if (boolean) {
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
  } else {
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    // diceEl.classList.remove('hidden');
  }
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    // current0El.textContent = currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to the active player's score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  // Check if player's score is >= 100
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    removeButtons(true);
  } else {
    switchPlayer();
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
