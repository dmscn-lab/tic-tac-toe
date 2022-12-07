import { status, showStatus, closeStatus, options } from './utils.js';

const response = document.getElementById('response');
const score = document.querySelectorAll('.score');
const scoreboard = [0, 0];

function gameBoard() {
  const list = ['', '', '', '', '', '', '', '', ''];
  let choice = true;

  return {
    play: (el, pos) => {
      if (list.length > 9) return;
      if (el.innerText.includes('O')) return;
      if (el.innerText.includes('X')) return;
      
      if (choice) {
        list[pos] = 'O';

        if (list.every(item => item !== '')) {
          el.innerHTML = `<img src="./assets/circle.svg"/>`
          list.map((item, pos) => list[pos] = '');

          status.classList.remove('won');
          status.classList.remove('lose');

          response.innerText = 'Draw! Try again';
          return showStatus();
        }

        const circleWin = [
          list[0] + list[1] + list[2],
          list[3] + list[4] + list[5],
          list[6] + list[7] + list[8],
          list[0] + list[3] + list[6],
          list[1] + list[4] + list[7],
          list[2] + list[5] + list[8],
          list[0] + list[4] + list[8],
          list[2] + list[4] + list[6],
        ]

        if (circleWin.some(elem => elem === 'OOO')) {
          el.innerHTML = `<img src="./assets/circle.svg"/>`

          list.map((item, pos) => list[pos] = '');

          status.classList.add('won');
          status.classList.remove('lose');

          scoreboard[0]++;
          score[0].innerText = scoreboard[0];

          response.innerText = 'Player Circle, Won!';
          return showStatus();
        }

        el.innerHTML = `<img src="./assets/circle.svg"/>`
        choice = false;
      } 
      else {
        list[pos] = 'X';

        if (list.every(item => item !== '')) {
          el.innerHTML = `<img src="./assets/x.svg"/>`
          list.map((item, pos) => list[pos] = '');

          status.classList.remove('won');
          status.classList.remove('lose');

          response.innerText = 'Draw! Try again';
          return showStatus();
        }

        const xWin = [
          list[0] + list[1] + list[2],
          list[3] + list[4] + list[5],
          list[6] + list[7] + list[8],
          list[0] + list[3] + list[6],
          list[1] + list[4] + list[7],
          list[2] + list[5] + list[8],
          list[0] + list[4] + list[8],
          list[2] + list[4] + list[6],
        ]

        if (xWin.some(elem => elem === 'XXX')) {
          el.innerHTML = `<img src="./assets/x.svg"/>`

          list.map((item, pos) => list[pos] = '');

          status.classList.add('lose');
          status.classList.remove('won');

          scoreboard[1]++;
          score[1].innerText = scoreboard[1];

          response.innerText = 'Player X, Won!';
          return showStatus();
        }

        el.innerHTML = `<img src="./assets/x.svg"/>`
        choice = true;
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
  closeStatus();
});