'use strict';

//#region selecting element
const playerOEl = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//#endregion

//#region starting conditions
let scores, currentScore, activePlayer, playing;
// we assigned them outside the finction so they can be accessible outside the function.


const init = function () {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  diceEl.classList.add('hidden');
  playerOEl.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  playerOEl.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// we call the function here because we want it to be executed right when the file is loaded and when the button new is clicked.

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOEl.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
//#endregion

//#region Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {

  // 1. generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //3. check for rolled 1: if true, switch to next player.
  // we have to creat a variable outside the function to store the score. We need to create outside becuae if we create inside all the time the button is clicked the score will be reseted.
  if(dice !== 1){
    // currentScore = currentScore + dice;
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
}
});


btnHold.addEventListener('click', function () {
 if (playing) {

 
  // 1. Add current score to active score
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1]+currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  

  if(scores[activePlayer] >= 100){
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

  } else {
    switchPlayer();
  }
}
});

btnNew.addEventListener('click', init);

//#endregion