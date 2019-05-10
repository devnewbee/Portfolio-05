/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
// var goal = document.querySelector('.input')
init();



// add event listener to roll dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
		// generate random number for each dice
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		// display the result with corresponding .png image of the dice
		var diceDOM1 = document.querySelector('.dice1');
		diceDOM1.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM2.style.display = 'block';
		diceDOM2.src = 'dice-' + dice2 + '.png';
		// update round score IF the rolled number was not 1
		if ((dice1 === 1) && (dice2 === 1)) {
			//both dice are 1 player loses the score
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
			document.querySelector('.warning').style.display = 'block';
			// next player
			nextPlayer();
		} else {
			// add score and update, querySelector use # to select id
			roundScore += (dice1 + dice2);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		}

	}
	
});

// function for hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// add CURRENT score to Global player score; access scores array
		scores[activePlayer] += roundScore;
		document.querySelector('.warning').style.display = 'none';

		// update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//get the value from input tag at html
		var input = document.querySelector('.goal').value;
		var winningScore;

		// check if undefined, 0, null or "" are coerced to false, anything else is coerced to true; 
		if(input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		// check if player WON the game, remove dice image, access winner class at CSS
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// nextPlayer
			nextPlayer();
		}
	}
	
});

// next player; DRY
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		// reset current score to 0
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		// change active player, add or remove but toggle is better
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// optional to hide dice 1
		// document.querySelector('.dice').style.display = 'none';

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');
}


// initialize new game
document.querySelector('.btn-new').addEventListener('click', init);

// create init function for new game, and for every start of the game
function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

// CSS manipulate, hide the dice image
document.querySelector('.dice1').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';
document.querySelector('.warning').style.display = 'none';
// select score id and set it to 0.
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.add('active');
}	

// math.random give random numbers, math.floor truncates decimals; we need number 1 to 6, so *6 + 1;
// JS format: document.querySelector('.class or #id in html').events(action, function or callback)

// select object from the html document to manipulate
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// coding challenge
/*
1. Player loses ENTIRE score when he rolls two 6 in a row. then, next player's turn
Hint: save previous dice roll in a separate variable
2. add input field in the html to change the winning score. use .value property in javascript
3. add another dice to the game, follow css format on the first dice.
*/

