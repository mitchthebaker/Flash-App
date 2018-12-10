//Sample data that I am using to test the flash card with
import {sampleData} from '/sampleData.js';

/* The 4 variables below are queried to their respective element tags,
 * the previousButton/nextButton variables are used to iterate back
 * and forth between each set of key/value pairs within the JSON data
 * that is being used, the frontCard/backCard variables represent the 
 * data being displayed on the front/back card <h1> elements 
 */
var previousButton = document.querySelector(".previousButton");
var nextButton = document.querySelector(".nextButton");
var frontCard = document.querySelector(".frontCard");
var backCard = document.querySelector(".backCard");

/* I use arrayCount as my main iterator in order to go through the 
 * keyValue_array array, which is a 2D array containing the keys from
 * sampleData represented as key_data, and the values from sampleData
 * represented as value_data
 */
var arrayCount = 0;
var key_data = Object.keys(sampleData);
var value_data = Object.values(sampleData);
var keyValue_array = [];

/* The below I was using as tests previously
 * console.log(key_data);
 * console.log(value_data);
 *
 * for(let key in sampleData) {
 * 	   console.log("Key name: " + key);
 *	   console.log("Key's value: " + sampleData[key]);
 * }
 *
 * console.log(createCardArray(key_data, value_data));
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

function clickCard() {
	document.querySelector(".flip-container").classList.toggle("hover");	
}

document.querySelector(".flip-container").addEventListener("click", clickCard, false);

console.log(createCardArray(key_data, value_data));

frontCard.textContent = keyValue_array[0][0];
backCard.textContent = keyValue_array[0][1];

document.getElementById('cardButtons').addEventListener('click', function(event) {
	
	var target = event.target;

	if(target.id === 'previousButton') {
		console.log(arrayCount);
		if((frontCard.textContent == keyValue_array[0][0]) && (backCard.textContent == keyValue_array[0][1])) {
			arrayCount = 0;
			console.log(arrayCount);
		} else {
			arrayCount--;
			console.log(arrayCount);
			frontCard.textContent = keyValue_array[arrayCount][0];
			backCard.textContent = keyValue_array[arrayCount][1];
		}
		
	} else if(target.id === 'nextButton') {
		/* Take not of line 83 and the second test statement within the if statement
		console.log(arrayCount);
		console.log(keyValue_array[key_data.length -1][1]);
		console.log(backCard.textContent);
		*/
		if((frontCard.textContent == keyValue_array[key_data.length - 1][0]) && (backCard.textContent == keyValue_array[key_data.length - 1][0])) {
			console.log(arrayCount);
		} else {
			arrayCount++;
			frontCard.textContent = keyValue_array[arrayCount][0];
			backCard.textContent = keyValue_array[arrayCount][1];
			console.log(arrayCount);
		}
	} else {
		console.log("You've reached an error, check out your code");
	}
}, false);



