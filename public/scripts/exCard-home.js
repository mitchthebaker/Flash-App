//Sample data that I am using to test the flash card with
//import {sampleData} from '/sampleData.js';

/* The 4 variables below are queried to their respective element tags,
 * the previousButton/nextButton variables are used to iterate back
 * and forth between each set of key/value pairs within the JSON data
 * that is being used, the frontCard/backCard variables represent the 
 * data being displayed on the front/back card <h1> elements 
 */
var query = {
	previousButton: document.querySelector(".previousButton-home"),
	nextButton: document.querySelector(".nextButton-home"),
	frontCard: document.querySelector(".frontCard-home"),
	backCard: document.querySelector(".backCard-home")
};

/* I use arrayCount as my main iterator in order to go through the 
 * keyValue_array array, which is a 2D array containing the keys from
 * sampleData represented as key_data, and the values from sampleData
 * represented as value_data
 */

var homeData = {
	term0: 'Your first term example here',
	definition0: 'You flipped the card, nice! Here is the first definition',
	term1: 'Your second term example here',
	definition1: "You're getting the hang of this! Here is the second definition.",
	terms: function() {
		let termArray = [];
		termArray.push(this.term0);
		termArray.push(this.term1);
		return termArray;
	},
	definitions: function() {
		let defArray = [];
		defArray.push(this.definition0);
		defArray.push(this.definition1);
		return defArray;
	},
	keyValue_array: [],
	arrayCount: 0
};

console.log(homeData.terms());
console.log(homeData.definitions());

document.getElementById('sendButton-home').addEventListener('click', function sendClick() {
	console.log('Example data submitted');
	homeData.term0 = document.getElementById('term0').value;
	homeData.definition0 = document.getElementById('definition0').value;
	homeData.term1 = document.getElementById('term1').value;
	homeData.definition1 = document.getElementById('definition1').value;
	homeData.keyValue_array = [];
	console.log(createCardArray(homeData.terms(), homeData.definitions()));

	query.frontCard.textContent = homeData.keyValue_array[0][0];
	query.backCard.textContent = homeData.keyValue_array[0][1];
});

function createCardArray(key, value) {
	for(let i = 0; i < key.length; i++) {
		let tempArray = [];
		tempArray.push(key[i]);
		tempArray.push(value[i]);

		homeData.keyValue_array.push(tempArray);
}
	return homeData.keyValue_array;
}

document.querySelector('.flip-container-home').addEventListener('click', function clickCard() {
	document.querySelector('.flip-container-home').classList.toggle('hover');
}, false);

console.log(createCardArray(homeData.terms(), homeData.definitions()));

query.frontCard.textContent = homeData.keyValue_array[0][0];
query.backCard.textContent = homeData.keyValue_array[0][1];

document.querySelector('.cardButtons-home').addEventListener('click', function(event) {
	var target = event.target;
	console.log(target);
	if(target.id === 'previousButton-home') {
		if(homeData.arrayCount == 0) {
			homeData.arrayCount = 0;
			console.log(homeData.arrayCount);
		} 
		else {
			homeData.arrayCount--;
			console.log(homeData.arrayCount);
			query.frontCard.textContent = homeData.keyValue_array[homeData.arrayCount][0];
			query.backCard.textContent = homeData.keyValue_array[homeData.arrayCount][1];
		}	
	} 
	else if(target.id === 'nextButton-home') {
		if(homeData.arrayCount == homeData.keyValue_array.length - 1) {
			homeData.arrayCount == homeData.keyValue_array.length - 1;
			console.log(homeData.arrayCount);
		} else {
			homeData.arrayCount++;
			query.frontCard.textContent = homeData.keyValue_array[homeData.arrayCount][0];
			query.backCard.textContent = homeData.keyValue_array[homeData.arrayCount][1];
			console.log(homeData.arrayCount);
		}
	} 
	else {
		console.log("You've reached an error, check out your code");
	}
}, false);