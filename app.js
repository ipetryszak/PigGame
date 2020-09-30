/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, stateVar;

function resetVars() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  stateVar = 1;
}
function changeUser(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}
function clearCurrentScore() {
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
}
function clearGlobalScore() {
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
}
function clearAndChange(){
  changeUser();
  clearCurrentScore();
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

resetVars();
//set dice pic unvisable
document.querySelector('.dice').style.display = 'none';
//set scores for 0
clearGlobalScore();
clearCurrentScore();

document.querySelector('.btn-roll').addEventListener('click', () => {

  if(stateVar){
    //1. Random number
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    //2. Show related picture of dice
    var dicePicture = document.querySelector('.dice');
    dicePicture.style.display = 'block';
    dicePicture.src = 'dice-'+diceNumber+'.png';

    //3. Update current score holder
    if(diceNumber !== 1) {
        roundScore += diceNumber;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }
    else {
        clearAndChange();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', () => {

    if(stateVar)
    {
      //1. Add round score to total score
      scores[activePlayer] += roundScore;
      document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
      //2. clear current score and change player
      //3. check if player won the game
      if(scores[activePlayer]>=100)
      {
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        stateVar = 0;
      }
      else
        clearAndChange();
    }
})

document.querySelector('.btn-new').addEventListener('click', () => {
  resetVars();
  clearCurrentScore();
  clearGlobalScore();
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
})
