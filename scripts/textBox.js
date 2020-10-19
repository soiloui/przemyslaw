import { changeListener } from './utils/changeListener.js';
import { ADD, REMOVE } from './utils/constans.js';
const textBox = () => {
	const textBoxMove_DIVs = document.querySelectorAll('.text-box__move');
	const textBoxContent_DIV = document.querySelector('.text-box__content');
	const textBoxLength = textBoxContent_DIV.children.length - 1;
	let actualText = 0;
	let prevText = actualText;
	let autoChangeInterval;

	// Interval of automatic change acutal visible text
	const textAutoChange = () => {
		autoChangeInterval = setInterval(() => {
			prevText = actualText;
			if (actualText < textBoxLength) {
				actualText++;
			} else {
				actualText = 0;
			}

			textBoxChange();
		}, 10000);
	};
	textAutoChange();

	// ---- Change displayed text ----
	// change acutalText variable
	const textBoxChange = (e) => {
		if (e) {
			clearInterval(autoChangeInterval);
			textAutoChange();
			prevText = actualText;

			if (e.target.classList.contains('text-box__move--next')) {
				if (actualText < textBoxLength) {
					actualText++;
				} else {
					actualText = 0;
				}
			} else {
				if (actualText > 0) {
					actualText--;
				} else {
					actualText = textBoxLength;
				}
			}
		}

		// changes during 1 frame of animation
		const textBoxFrame = () => {
			if (phase === 0) {
				if (boxOpacity > 0) {
					boxOpacity -= frameOpacityChange;
					textBoxContent_DIV.style.opacity = boxOpacity;
				} else {
					textBoxContent_DIV.children[prevText].classList.remove(
						'text-box__item--active'
					);
					textBoxContent_DIV.children[actualText].classList.add(
						'text-box__item--active'
					);
					phase = 1;
				}
			} else if (phase === 1 && boxOpacity < 1) {
				boxOpacity += frameOpacityChange;
				textBoxContent_DIV.style.opacity = boxOpacity;
			} else {
				clearInterval(boxAnimateInterval);
			}
		};

		// setup for animation
		let boxOpacity = 1;
		let phase = 0;
		const frameTime = 30;
		const frameOpacityChange = 0.05;
		const boxAnimateInterval = setInterval(textBoxFrame, frameTime);

		// remove click listener until animation ends
		changeListener(REMOVE, textBoxMove_DIVs, textBoxChange);
		setTimeout(() => {
			changeListener(ADD, textBoxMove_DIVs, textBoxChange);
		}, frameTime * 2 * (100 / (frameOpacityChange * 100)));
	};

	// Default set click listener to active
	changeListener(ADD, textBoxMove_DIVs, textBoxChange);

	// Check if tab is inactive
	document.addEventListener('visibilitychange', function () {
		if (document.hidden) {
			clearInterval(autoChangeInterval);
		} else {
			textAutoChange();
		}
	});
};

export { textBox };
