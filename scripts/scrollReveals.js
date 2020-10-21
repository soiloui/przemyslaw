const scrollReveals = () => {
	ScrollReveal({
		delay: 200,
		duration: 1500,
		distance: '100px',
		opacity: 0,
	});

	ScrollReveal().reveal('.main-wrapper');
	ScrollReveal().reveal('.sidebyside__item');
	ScrollReveal().reveal('.coop-group');
	ScrollReveal().reveal('.opinion');
	ScrollReveal().reveal('.contact-link');
};

export { scrollReveals };
