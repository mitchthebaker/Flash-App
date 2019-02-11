//Object with imbedded variables for the scroll event below
var scroll = {
	position: window.scrollY,
	header: document.querySelector('.headerActivityPage-home'),
	addOnScroll: function() {
		scroll.header.classList.add('headerActivityPage-newSet-scroll');
	},
	removeOnScroll: function() {
		scroll.header.classList.remove('headerActivityPage-newSet-scroll');
	}
};

//Changes background color of header when scroll.position > 50
window.addEventListener('scroll', function() {
	scroll.position = window.scrollY;

	if(scroll.position > 40) {
		scroll.addOnScroll();
	} else {
		scroll.removeOnScroll();
	}
	//console.log('Current scroll position for header: ' + scroll.position);
});