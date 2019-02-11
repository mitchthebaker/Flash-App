var v = {
	newSetMenu: document.querySelector('#newSet-menu')
};

//The function tests whether an element has the specified class or not
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > - 1;
}

v.newSetMenu.addEventListener('click', function() {
	if(!(hasClass(document.querySelector('.dropbtn-menu'), 'dropbtn-menu-show'))) {
		console.log('opening menu');
		document.querySelector('.dropbtn-menu').classList.add('dropbtn-menu-show');
	} else {
		console.log('closing menu');
		document.querySelector('.dropbtn-menu').classList.remove('dropbtn-menu-show');
	}
});
