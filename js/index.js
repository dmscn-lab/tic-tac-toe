import { status, showModal, closeModal, options } from './utils.js';

const score = document.querySelectorAll('.score');

function playerMove(element, player = "X") {
  player === "O" 
  ? element.innerHTML = "<img src='./assets/circle.svg'/>"
  : element.innerHTML = "<img src='./assets/x.svg'/>"
}

function playerStatus(board, player = "X") {
  const cases = [
    [0, 1, 2].every(item => board[item] === player),
    [3, 4, 5].every(item => board[item] === player),
    [6, 7, 8].every(item => board[item] === player),
    [0, 4, 8].every(item => board[item] === player),
    [2, 4, 6].every(item => board[item] === player),
    [0, 3, 6].every(item => board[item] === player),
    [1, 4, 7].every(item => board[item] === player),
    [2, 5, 8].every(item => board[item] === player)
  ]

  board.every(item => item !== '') || cases.some(condition => condition)
  ? cases.some(condition => condition) 
    ? playerWinner(player)
    : draw()
  : '';
}

function playerWinner(player) {
  const result = document.getElementById('response');
  result.innerText = `Player '${player}' Won!`;
  game.scoreboard(player);

  showModal();
}

function draw() {
  const result = document.getElementById('response');
  result.innerText = 'Draw!';
  
  showModal();
}

function gameBoard() {
  const scoreboard = [0, 0];
  const board = ['', '', '', '', '', '', '', '', ''];
  let player = true;

  return {
    play: (element, position) => {
      if (player && board[position] === '') {
        board[position] = 'O';

        playerMove(element, "O");
        playerStatus(board, "O");

        player = false;
      }

      else if (!player && board[position] === '') {
        board[position] = 'X';

        playerMove(element);
        playerStatus(board);
  
        player = true;
      }
    },
    scoreboard: (player) => {
      player === 'O' ? scoreboard[0]++ : scoreboard[1]++;
    
      score[0].innerText = scoreboard[0];
      score[1].innerText = scoreboard[1];
    },
    reset: () => {
      for(let i = 0; i < board.length; i++) {
        board[i] = '';
      }
    }
  }
}

const game = gameBoard();

options.forEach((element, pos) => {
  element.addEventListener('click', () => {
    game.play(element, pos);
  })
})

status.addEventListener('animationend', () => {
  options.forEach(element => element.innerHTML = '');
  game.reset();
  closeModal();
});