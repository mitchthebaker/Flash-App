/*
 *** Keeping this here just because I've seen .onreadystagechange 
	 used a bit, it seems like an old feature though. Using the 
	 FormData() object is a much more modern way of sending
	 AJAX requests

xhr.onreadystagechange = function() {
	if()
};
*/

window.addEventListener("load", function() {
	function sendData() {
		var xhr = new XMLHttpRequest();
		var formData = new FormData(form);

		//console.log's event.target.responseText on successful data submission
		xhr.addEventListener("load", function(event) {
			console.log(event.target.responseText);
		});

		//console.log's event in case of an error
		xhr.addEventListener("error", function(event) {
			console.log("Error: " + event);
		});

		xhr.open("POST", "https://floating-stream-61877.herokuapp.com/db");
		xhr.send(formData);
	}

	var form = document.querySelector(".flashForm");
	form.addEventListener("submit", function(event) {
		event.preventDefault();

		sendData();
	});
});