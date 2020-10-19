import { ADD, REMOVE } from './constans.js';
const changeListener = (action, arrayOfItems, func) => {
	if (action === ADD) {
		arrayOfItems.forEach((item) => {
			item.addEventListener('click', func);
		});
	} else if (action === REMOVE) {
		arrayOfItems.forEach((item) => {
			item.removeEventListener('click', func);
		});
	}
};

export { changeListener };
