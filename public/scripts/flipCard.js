import {sampleData} from '/sampleData.js';
var previousButton = document.querySelector(".previousButton");
var nextButton = document.querySelector(".nextButton");
var frontCard = document.querySelector(".frontCard");
var backCard = document.querySelector(".backCard");
var key_data = Object.keys(sampleData);
var value_data = Object.values(sampleData);
var keyValue_array = [];

/*
console.log(key_data);
console.log(value_data);

for(let key in sampleData) {
	console.log("Key name: " + key);
	console.log("Key's value: " + sampleData[key]);
}

console.log(createCardArray(key_data, value_data));
*/

function createCardArray(key, value) {
	for(let i = 0; i < key.length; i++) {
		let tempArray = [];
		tempArray.push(key[i]);
		tempArray.push(value[i]);

		keyValue_array.push(tempArray);
}
return keyValue_array;
}

function ifButtonClicked() {

}

document.querySelector(".flip-container").onclick = function clickCard() {
	document.querySelector(".flip-container").classList.toggle("hover");	
};

createCardArray(key_data, value_data);

frontCard.textContent = keyValue_array[0][0];
backCard.textContent = keyValue_array[0][1];

document.getElementById('cardButtons').addEventListener('click', function(event) {
	var target = event.target;

	if(target.id === 'previousButton') {
		if((frontCard.textContent === keyValue_array[0][0]) && (backCard.textContent = keyValue_array[0][1])) {

		}
		
	} else if(target.id === 'nextButton') {
		frontCard.textContent = keyValue_array[1][0];
		backCard.textContent = keyValue_array[1][1];
	}
}, false);



