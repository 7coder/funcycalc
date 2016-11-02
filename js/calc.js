window.onload = function(){

	var doc = document;
		calcValue = doc.getElementById('calc_value'),
		digits = doc.querySelectorAll('.digits'),
		actions = doc.querySelectorAll('.actions'),
		result = doc.querySelectorAll('.result'),
		sign = doc.querySelectorAll('.sign'),
		reset = doc.querySelectorAll('.reset'),
		percent = doc.querySelectorAll('.percent'),
		showSign = doc.getElementById('calc_operation'),
		eventItem = doc.getElementById('event_item'),
		action = firstArgument = secondArgument = "",
		resultOverall = 0;

	//Function "Do another action after result"

	function resultToFirstArgument (resultOverall){
		firstArgument = resultOverall.toString(); 
		secondArgument = "";
	};	

	//Function to clear all elements ans variables

	function clearAll(){
		resultOverall = calcValue.innerHTML = 0;
		action = firstArgument = secondArgument = showSign.innerHTML = calcValue.className = '';
		eventItem.classList.remove('animate_top', 'divide_on_zero');
		eventItem.classList.remove('animate_right', 'lol');
		eventItem.classList.remove('animate_right', 'too_long');
		
	};

	// Initialization of number buttons

	for (var i = 0; i < digits.length; i++) {	

			digits[i].onclick = function(){

				var digitsShow = this.innerHTML;

				//Checking for available results
				if(showSign.innerHTML === "="){
					clearAll();
				};

				if (action === ""){
	
					firstArgument += digitsShow;

					//Limit of numbers in Calculator Display for FirstArgument

					if(firstArgument.length < 7){
						calcValue.innerHTML = firstArgument; 	
					} else{
						calcValue.innerHTML = firstArgument.substring(0,7)
					};

				} else {
					secondArgument += digitsShow;

					//Limit of numbers in Calculator Display for SecondArgument

					if(secondArgument.length < 7){
						calcValue.innerHTML = secondArgument; 	
					} else{
						calcValue.innerHTML = secondArgument.substring(0,7)
					};
				};

			};
	};
			
	// Initialization of actions buttons
	for (var i = 0; i < actions.length; i++) {	

			actions[i].onclick = function(){

				action = this.getAttribute('data-value');	

				if(resultOverall !== undefined && secondArgument !== ''){
					resultToFirstArgument (resultOverall);
				};

				//Show Sign value in Div container, when U clicked on button

				switch (action){
					case "plus" : {
						showSign.innerHTML = "+";
						break;
					}
					case "minus" : {
						showSign.innerHTML = "-";
						break;
					}
					case "multiply" : {
						showSign.innerHTML = "x";
						break;
					}
					case "divide" : {
						showSign.innerHTML = "&#247;";
						break;
					}
					case "sqrt" : {
						showSign.innerHTML = "&radic;";
						break;
					}
					default: {
						showSign.innerHTML = "";
						break;
					}
				};
			};
	};

	// Initialization of button of dign value
	for (var i = 0; i < sign.length; i++) {	

			sign[i].onclick = function(){

				if (firstArgument !== "0" && secondArgument === ""){
					firstArgument = firstArgument * (-1);
					calcValue.innerHTML = firstArgument;
				} else {
					secondArgument = secondArgument * (-1);
					calcValue.innerHTML = secondArgument;
				}
				
			};
	};

	//Initialization of percent button
	for (var i = 0; i < percent.length; i++) {	

			percent[i].onclick = function(){

				percent = this.getAttribute('data-value');

				if (firstArgument !== "0" && secondArgument !== "0"){
					secondArgument = (firstArgument * secondArgument)/100;
				};

				if (percent[i]){
					showSign.innerHTML = "&#37;";
				};
				
			};
	};
						

	// Initialization of Math operations: +, /, -, *, sqrt
	for (var i = 0; i < result.length; i++) {	

			result[i].onclick = function(){

				switch (action){
					case "plus" : {
						resultOverall = Number(firstArgument) + Number(secondArgument);
						showSign.innerHTML = "=";
						break;
					}
					case "minus" : {
						resultOverall = Number(firstArgument) - Number(secondArgument); 
						showSign.innerHTML = "=";
						break;
					}
					case "multiply" : {
						resultOverall = Number(firstArgument) * Number(secondArgument); 
						showSign.innerHTML = "=";
						break;
					}
					case "divide" : {
						resultOverall = Number(firstArgument) / Number(secondArgument); 
						showSign.innerHTML = "=";
						break;
					}
					case "sqrt" : {
						resultOverall = Math.sqrt(Number(firstArgument)); 
						showSign.innerHTML = "=";
						break;
					}
					default: {
						resultOverall = 0;
						showSign.innerHTML = '';
						break;
					}
				};
				
				calcValue.innerHTML = (Math.round(resultOverall * 1000)/1000);

				// BigChecker values. JS Souce.
				
				if(firstArgument.length > 7 && firstArgument.length <= 9){
					
					calcValue.className = 'from7to9';

				} else if (firstArgument.length > 9 && firstArgument.length <= 13){
					
					calcValue.className = 'from9to13';

				};


				//Check the results

				if (resultOverall === Infinity || resultOverall === -Infinity){
					
					// Add 'animate_top' css class for popup block

					eventItem.classList.add('animate_top', 'divide_on_zero');
					calcValue.innerHTML = '<div class=\"event_text\">Please push the \"C\" to stop<br/>  annoy the angry granny!</div>';
					firstArgument = '';

				} else if (resultOverall === 707){

					// Add 'animate_right' css class for popup block

					eventItem.classList.add('animate_right', 'lol');
					calcValue.innerHTML = 'LOL!';
					firstArgument = '';

				} else if (calcValue.innerHTML.length > 13){

					// Add 'animate_top' css class for popup block

					eventItem.classList.add('animate_top', 'too_long');
					calcValue.innerHTML = '<div class=\"event_text\">Push the \"C\" button<br/> to wink to the pretty girl!</div>';

				};
				
			};
	};


	// Initialization of C button. Reset all values.

	for (var i = 0; i < reset.length; i++) {	

			reset[i].onclick = function(){
				clearAll();
			};
	};
				

};



 

