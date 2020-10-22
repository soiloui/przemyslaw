import { changeListener } from './utils/changeListener.js';
import { ADD, REMOVE } from './utils/constans.js';
const opinions = () => {
	const groupMove_DIVs = document.querySelectorAll('.text-box__move');

	const groupsWrapper_DIV = document.querySelector('.opinions-wrapper');
	const itemsQuantity = groupsWrapper_DIV.children.length - 1;
	let actualGroup = 0;
	let prevGroup = actualGroup;
	let autoChangeInterval;

	// Interval of automatic change acutal visible group
	const autoChangeActiveGroup = () => {
		autoChangeInterval = setInterval(() => {
			prevGroup = actualGroup;
			if (actualGroup < itemsQuantity) {
				actualGroup++;
			} else {
				actualGroup = 0;
			}

			groupChange();
		}, 5000);
	};
	autoChangeActiveGroup();

	// ---- Change displayed group ----
	// change acutalGroup variable
	const groupChange = (e) => {
		if (e) {
			clearInterval(autoChangeInterval);
			autoChangeActiveGroup();
			prevGroup = actualGroup;

			if (e.target.classList.contains('text-box__move--next')) {
				if (actualGroup < itemsQuantity) {
					actualGroup++;
				} else {
					actualGroup = 0;
				}
			} else {
				if (actualGroup > 0) {
					actualGroup--;
				} else {
					actualGroup = itemsQuantity;
				}
			}
		}

		// changes during 1 frame of animation
		const textBoxFrame = () => {
			if (phase === 0) {
				if (boxOpacity > 0) {
					boxOpacity -= frameOpacityChange;
					groupsWrapper_DIV.style.opacity = boxOpacity;
				} else {
					groupsWrapper_DIV.children[prevGroup].classList.remove(
						'opinion-group--active'
					);
					groupsWrapper_DIV.children[actualGroup].classList.add(
						'opinion-group--active'
					);
					phase = 1;
				}
			} else if (phase === 1 && boxOpacity < 1) {
				boxOpacity += frameOpacityChange;
				groupsWrapper_DIV.style.opacity = boxOpacity;
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
		changeListener(REMOVE, groupMove_DIVs, groupChange);
		setTimeout(() => {
			changeListener(ADD, groupMove_DIVs, groupChange);
		}, frameTime * 2 * (100 / (frameOpacityChange * 100)));
	};

	// Default set click listener to active
	changeListener(ADD, groupMove_DIVs, groupChange);

	// Check if tab is inactive
	document.addEventListener('visibilitychange', function () {
		if (document.hidden) {
			clearInterval(autoChangeInterval);
		} else {
			autoChangeActiveGroup();
		}
	});
};

export { opinions };
