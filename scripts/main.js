import { textBox } from './textBox.js';
import { scrollReveals } from './scrollReveals.js';
textBox();
scrollReveals();

const hamburger_DIV = document.querySelector('.hamburger-wrapper');
const navigation_NAV = document.querySelector('.navigation');
hamburger_DIV.addEventListener('click', () => {
	hamburger_DIV.classList.toggle('hamburger-wrapper--active');
	navigation_NAV.classList.toggle('navigation--active');
});
