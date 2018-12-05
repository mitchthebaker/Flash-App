const MAX_TERM_VALUE = 1000;
var count = 1;

function createNewElement(element, attributes) {
	if(attributes) {
		let newElement = document.createElement(element);

		for(var key in attributes) {
			newElement.setAttribute(key, attributes[key]);
		}

		return newElement; 
	}
	else {
		let newElement = document.createElement(element);

		return newElement;
	}
}

function createNewCardDiv() {
	let newCard = createNewElement("div", {"class": "newCard", "id": "newCard"});
	
	newCard.innerHTML = 
	'<div class="Term-Definition"> <div class="Term"> <input class="newCard-Term" type="text" name="term-' + count + '" placeholder="Term"> <h3 class="Term-h3"> Term </h3> </div> <div class="Definition"> <input class="newCard-Definition" type="text" name="definition-' + count + '" placeholder="Definition"> <h3 class="Definition-h3"> Definition </h3> </div> </div>';

	console.log(newCard);
				
	document.querySelector(".flashForm").appendChild(newCard);
	count++;

	console.log(count);
}

var elementClicked = false;

function clickHandler() {
	elementClicked = true;
	console.log("elementClicked is now TRUE, end of do/while");
}

function submitTF() {
	let sendButton = document.getElementById("sendButton");
	sendButton.addEventListener('click', function() {
		clickHandler()
	});
	return elementClicked;
}

do {
	document.getElementById("addCardButton").addEventListener("click", function() {
		createNewCardDiv()
	});
} while((count <= MAX_TERM_VALUE) && (submitTF() !== false));

import {sampleData} from '/sampleData.js';

console.log(sampleData);

/*
	Just so I remember where I left off last night, I got this do/while
	loop working so my next step is to include a count that increases incrementally
	so that I can change the attributes of each card using .setAttribute() method
*/
