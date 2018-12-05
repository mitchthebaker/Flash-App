
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
	'<div class="Term-Definition"> <div class="Term"> <input class="newCard-Term" type="text" placeholder="Term"> <h3 class="Term-h3"> Term </h3> </div> <div class="Definition"> <input class="newCard-Definition" type="text" placeholder="Definition"> <h3 class="Definition-h3"> Definition </h3> </div> </div>';

	console.log(newCard);
				
	document.querySelector(".flashForm").appendChild(newCard);
}

var elementClicked = false;

function clickHandler() {
	elementClicked = true;
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
} while(submitTF() !== false);

import {sampleData} from '/sampleData.js';

console.log(sampleData);
