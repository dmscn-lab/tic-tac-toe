const menu = document.getElementById('menu');
const game = document.getElementById('game');

export const options = document.querySelectorAll('.frame .option');
export const play = document.getElementById('play');
export const goBack = document.getElementById('back');
export const restart = document.getElementById('reset');

play.addEventListener('click', () => {
  menu.classList.add('disable');
  game.classList.remove('disable');
})

goBack.addEventListener('click', () => {
  menu.classList.remove('disable');
  game.classList.add('disable');
})