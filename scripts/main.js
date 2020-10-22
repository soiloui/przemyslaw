import { textBox } from './textBox.js';
import { opinions } from './opinions.js';
import { scrollReveals } from './scrollReveals.js';
textBox();
opinions();
scrollReveals();

// ---- Scrolling to local links
const defaultDuration = 1500;
let edgeOffset; // How much space leave on top after scroll (px)
if (window.innerWidth < 831) {
	edgeOffset = 0;
} else {
	edgeOffset = 48;
}
zenscroll.setup(defaultDuration, edgeOffset);

// ---- Listener for click on hamburger menu => toggle menu
const hamburger_DIV = document.querySelector('.hamburger-wrapper');
const navigation_NAV = document.querySelector('.navigation');
hamburger_DIV.addEventListener('click', () => {
	hamburger_DIV.classList.toggle('hamburger-wrapper--active');
	navigation_NAV.classList.toggle('navigation--active');
});

// ---- Hide menu if local link was clicked (smaller devices)
const localLinks_A = document.querySelectorAll('.local_link');
localLinks_A.forEach((link) => {
	link.addEventListener('click', () => {
		hamburger_DIV.classList.remove('hamburger-wrapper--active');
		navigation_NAV.classList.remove('navigation--active');
	});
});
