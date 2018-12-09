import {sampleData} from '/sampleData.js';
var previousButton = document.querySelector(".previousButton");
var nextButton = document.querySelector(".nextButton");
var frontCard = document.querySelector(".frontCard");
var backCard = document.querySelector(".backCard");

document.querySelector(".flip-container").onclick = function clickCard() {
	document.querySelector(".flip-container").classList.toggle("hover");	
};

for(let key in sampleData) {
	console.log("Key name: " + key);
	console.log("Key's value: " + sampleData[key]);
}
