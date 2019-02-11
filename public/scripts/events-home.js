//The function tests whether an element has the specified class or not
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > - 1;
}

//.addEventListener() event for the 'Sign Up' button within the body of the page
document.querySelector('.home-logOn-div-bottom').addEventListener('click', function() {
	if(!(hasClass(document.querySelector('.register-bar'), 'register-bar-show'))) {
		console.log('opening register bar');
		document.querySelector('.register-bar').classList.add('register-bar-show');
	} else {
		console.log('closing register bar');
		document.querySelector('.register-bar').classList.remove('register-bar-show');
	}
});



//.addEventListener() event 
document.getElementById('register-login-click').addEventListener('click', function() {
	if(!hasClass(document.querySelector('.login-bar-header', 'login-bar-header-show'))) {
		console.log('opening login bar from the header <a> tag');
		document.querySelector('.login-bar-header').classList.add('login-bar-header-show');
	} else {
		console.log('closing login bar from the header <a> tag');
		document.querySelector('.login-bar-header').classList.remove('login-bar-header-show');
	}
});

//Object with imbedded variables for the scroll event below
var scroll = {
	position: window.scrollY,
	header: document.querySelector('.headerActivityPage-home'),
	addOnScroll: function() {
		scroll.header.classList.add('headerActivityPage-home-scroll');
	},
	removeOnScroll: function() {
		scroll.header.classList.remove('headerActivityPage-home-scroll');
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

/*

//.addEventListener() event for the 'Sign Up' button in header
document.querySelector('.signUp-a').addEventListener('click', function() {
	if(!hasClass(document.querySelector('.register-bar-header', 'register-bar-header-show'))) {
		console.log('opening register bar from the header <a> tag');
		document.querySelector('.register-bar-header').classList.add('register-bar-header-show');
	} else {
		console.log('closing register bar from the header <a> tag');
		document.querySelector('.register-bar-header').classList.remove('register-bar-header-show');
	}
});

document.querySelector('.register-bar-header-exit').addEventListener('click', function() {
	document.querySelector('.register-bar-header').classList.remove('register-bar-header-show');
});

//.addEventListener() event for the 'Login' button in header
document.querySelector('.login-a').addEventListener('click', function() {
	if(!hasClass(document.querySelector('.login-bar-header', 'login-bar-header-show'))) {
		console.log('opening login bar from the header <a> tag');
		document.querySelector('.login-bar-header').classList.add('login-bar-header-show');
	} else {
		console.log('closing login bar from the header <a> tag');
		document.querySelector('.login-bar-header').classList.remove('login-bar-header-show');
	}
});

//Removes the .login-bar-header-show class from .login-bar-header
document.querySelector('.login-bar-header-exit').addEventListener('click', function() {
	document.querySelector('.login-bar-header').classList.remove('login-bar-header-show');
});

*/