import { options } from "./utils.js";

function gameBoard() {
  const list = ['', '', '', '', '', '', '', '', ''];
  let choice = true;

  return {
    play: (el, pos) => {
      if (list.length > 9) return;
      if (el.innerText.includes('O')) return;
      if (el.innerText.includes('X')) return;
      if (list[pos].includes('Win')) return;
      
      if (choice) {
        list[pos] = 'O';

        if (list.every(item => item !== '')) {
          el.innerHTML = `<img src="./assets/circle.svg"/>`
          return alert("It's old, try again!");
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

          list.map((item, pos) => list[pos] = 'Win');

          return alert('Player Circle won!'); 
        }

        el.innerHTML = `<img src="./assets/circle.svg"/>`
        choice = false;
      } 
      else {
        list[pos] = 'X';

        if (list.every(item => item !== '')) {
          el.innerHTML = `<img src="./assets/x.svg"/>`
          return alert("It's old, try again!");
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

          list.map((item, pos) => list[pos] = 'Win');

          return alert('Player X won!');
        }

        el.innerHTML = `<img src="./assets/x.svg"/>`
        choice = true;
      }
    },
    reset: () => {
      list.map((item, pos) => list[pos] = '');

      options.forEach((element) => {
        element.innerHTML = '';
      })
    }
  }
}

const game = gameBoard();

options.forEach((element, pos) => {
  element.addEventListener('click', () => {
    game.play(element, pos);
  })
})