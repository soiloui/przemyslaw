import { changeListener } from './changeListener.js';
import { ADD, REMOVE } from './constans.js';

const contentGallery = (
	section,
	wrapper,
	classDisplaysGroup,
	autoChangeDuration
) => {
	const groupMove_DIVs = section.querySelectorAll('.group-move');

	const itemsQuantity = wrapper.children.length - 1;
	let actualGroup = 0;
	let prevGroup = actualGroup;
	let autoChangeInterval;

	// ---- Change displayed group ----
	// change acutalGroup variable
	const groupChange = (e) => {
		if (e) {
			clearInterval(autoChangeInterval);
			autoChangeActiveGroup();
			prevGroup = actualGroup;

			if (e.target.classList.contains('group-move--next')) {
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
		const animationFrame = () => {
			if (phase === 0) {
				if (boxOpacity > 0) {
					boxOpacity -= frameOpacityChange;
					wrapper.style.opacity = boxOpacity;
				} else {
					wrapper.children[prevGroup].classList.remove(classDisplaysGroup);
					wrapper.children[actualGroup].classList.add(classDisplaysGroup);
					phase = 1;
				}
			} else if (phase === 1 && boxOpacity < 1) {
				boxOpacity += frameOpacityChange;
				wrapper.style.opacity = boxOpacity;
			} else {
				clearInterval(boxAnimateInterval);
			}
		};

		// setup for animation
		let boxOpacity = 1;
		let phase = 0;
		const frameTime = 30;
		const frameOpacityChange = 0.05;
		const boxAnimateInterval = setInterval(animationFrame, frameTime);

		// remove click listener until animation ends
		changeListener(REMOVE, groupMove_DIVs, groupChange);
		setTimeout(() => {
			changeListener(ADD, groupMove_DIVs, groupChange);
		}, frameTime * 2 * (100 / (frameOpacityChange * 100)));
	};

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
		}, autoChangeDuration);
	};
	autoChangeActiveGroup();

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

export { contentGallery };
