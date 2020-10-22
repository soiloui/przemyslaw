'use strict';

import { contentGallery } from './utils/contentGallery.js';
import { scrollReveals } from './scrollReveals.js';
scrollReveals();

// texts 'gallery' in header
const header_SEC = document.querySelector('#header');
const textBoxContent_DIV = document.querySelector('.text-box__content');
contentGallery(header_SEC, textBoxContent_DIV, 'text-box__item--active', 10000);

// opinions 'gallery' in opinions section
const opinions_SEC = document.querySelector('.opinions');
const opinionssWrapper_DIV = document.querySelector('.opinions-wrapper');
contentGallery(
	opinions_SEC,
	opinionssWrapper_DIV,
	'opinion-group--active',
	10000
);

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
