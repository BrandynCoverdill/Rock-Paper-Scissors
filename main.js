const startGameBtn = document.querySelector('.start-game button');
const rockBtn = document.querySelector('.in-game button:nth-of-type(1)');
const paperBtn = document.querySelector('.in-game button:nth-of-type(2)');
const scissorsBtn = document.querySelector('.in-game button:nth-of-type(3)');

class Player {
	constructor(name, wins) {
		this.name = name;
		this.wins = wins;
	}
}

class User extends Player {
	constructor(name, wins = 0, choice) {
		super(name, wins);
		this.choice = choice;
	}
}

class Computer extends Player {
	constructor(name, wins = 0, choice) {
		super(name, wins);
		this.choice = choice;
	}
	getComputerChoice() {
		let choice = Math.floor(Math.random() * 3) + 1;
		switch (choice) {
			case 1:
				return 'rock';
				break;

			case 2:
				return 'paper';
				break;

			case 3:
				return 'scissors';
				break;

			default:
				return 'error...';
				break;
		}
	}
}

window.onload = function () {
	startGameBtn.removeAttribute('disabled', false);
	rockBtn.setAttribute('disabled', true);
	paperBtn.setAttribute('disabled', true);
	scissorsBtn.setAttribute('disabled', true);
};

// Disable start game button when the user clicks it and enables the game buttons
startGameBtn.addEventListener('click', () => {
	if (com.wins === 3 || player.wins === 3) {
		com.wins = 0;
		player.wins = 0;
		com.choice = '';
		player.choice = '';
		updateScores();
		updateOutcome();
	} else {
		showScores();
	}

	startGameBtn.toggleAttribute('disabled');
	rockBtn.toggleAttribute('disabled');
	paperBtn.toggleAttribute('disabled');
	scissorsBtn.toggleAttribute('disabled');
});

const gameBtns = document.querySelector('.in-game');

gameBtns.addEventListener('click', (e) => {
	switch (e.target.id) {
		case 'rock':
			player.choice = 'rock';
			showOutcome();
			break;

		case 'paper':
			player.choice = 'paper';
			showOutcome();
			break;

		case 'scissors':
			player.choice = 'scissors';
			showOutcome();
			break;

		default:
			break;
	}
});

function decideWinner() {
	switch (player.choice) {
		case 'rock':
			if (com.choice === 'rock') {
				return 'Game tied!';
			} else if (com.choice === 'paper') {
				com.wins += 1;
				return `${com.name} won!`;
			} else {
				player.wins += 1;
				return `${player.name} won!`;
			}
			break;

		case 'paper':
			if (com.choice === 'rock') {
				player.wins += 1;
				return `${player.name} wins!`;
			} else if (com.choice === 'paper') {
				return 'Game tied!';
			} else {
				com.wins += 1;
				return `${com.name} wins!`;
			}
			break;

		case 'scissors':
			if (com.choice === 'rock') {
				com.wins += 1;
				return `${com.name} wins!`;
			} else if (com.choice === 'paper') {
				player.wins += 1;
				return `${player.name} wins!`;
			} else {
				return 'Game tied!';
			}
			break;

		default:
			break;
	}
}

// Display scores when the user is in the game
function showScores() {
	const div = document.createElement('div');
	const h2 = document.createElement('h2');
	const playerScore = document.createElement('h2');
	const computerScore = document.createElement('h2');

	h2.textContent = 'SCORES';
	playerScore.textContent = player.name + ': ' + player.wins;
	computerScore.textContent = com.name + ': ' + com.wins;

	h2.style.width = 'fit-content';
	h2.style.margin = '0 auto';

	div.appendChild(h2);
	div.appendChild(playerScore);
	div.appendChild(computerScore);
	document.querySelector('.score').appendChild(div);
}

function showOutcome() {
	com.choice = com.getComputerChoice();

	let parentdiv = document.querySelector('.result');
	const div = document.createElement('div');
	const h2 = document.createElement('h2');
	const computerOutcome = document.createElement('h2');
	const playerOutcome = document.createElement('h2');
	const outcome = document.createElement('h2');

	h2.textContent = 'OUTCOME';
	computerOutcome.textContent = com.name + ' has chosen: ' + com.choice;
	playerOutcome.textContent = player.name + ' has chosen: ' + player.choice;
	outcome.textContent = decideWinner();

	h2.style.width = 'fit-content';
	h2.style.margin = '0 auto';
	computerOutcome.style.color = 'honeydew';
	playerOutcome.style.color = 'lightgreen';
	outcome.style.backgroundColor = 'rgb(105, 185, 235)';
	outcome.style.width = 'fit-content';
	outcome.style.paddingInline = '.5em';

	div.appendChild(h2);
	div.appendChild(computerOutcome);
	div.appendChild(playerOutcome);
	div.appendChild(outcome);
	parentdiv.insertBefore(div, parentdiv.firstChild);
	updateScores();

	if (com.wins === 3 || player.wins === 3) {
		startGameBtn.toggleAttribute('disabled');
		rockBtn.toggleAttribute('disabled');
		paperBtn.toggleAttribute('disabled');
		scissorsBtn.toggleAttribute('disabled');
		com.wins > player.wins
			? alert(`${com.name} Won!`)
			: alert(`${player.name} Won!`);
	}
}

// Refreshes the score when the user has selected a choice
function updateScores() {
	const div = document.querySelector('.score div');
	document.querySelector('.score').removeChild(div);
	showScores();
}

function updateOutcome() {
	document.querySelector('.result').textContent = '';
}

const com = new Computer('Game master');
const player = new User('Player');
