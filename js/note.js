$(function () {
	
	//Cache DOM
	var $fCalcValue = $('#calc_value'),
		$noteContainer = $('#note_container'),
		$noteOverall = $('#note_overall'),
		$clearNoteButton = $('#clear_note'),
		$addNoteButton = $('#add_note'),
		$defaultCurrencySelector = $('#default_currency select'),
		$valueInput = $('.value_input'),
		noteLineTemplate = $('#note_line_template').html(),
		noteItemList = {},
		defaultCurrency = 'none',
		counterId = overall = 0,
		regExpSymbols = /(@|#|%|&|±|§|\?|~|`|>|<|\$|\^|_|-|\{|\}|\[|\]|№){2,}/g;
		

	// Initialization of Mustach.js
	function addEntry(id, noteItem){

		//Add ID to Template Mustach.js
		var objectAssign = Object.assign({id: id}, noteItem);
		$noteContainer.append(Mustache.render(noteLineTemplate, objectAssign));
	};


	//New Object NoteItem
	var createNoteItem = function(value, desc, cy){
		return {
				value: value,
				desc: desc,
				currency: cy
				};
	};


	// Add lines to array
	function addNoteItemToList(id, noteItem){
		noteItemList[id] = noteItem;
	};


	//The number of free entries
	function showFreeEntries(){
		var entriesNumbers = Number($('#note_have_entries').html());
		
		entriesNumbers = 10 - $('.note_item_wrap').length;
		$('#note_have_entries').html(entriesNumbers);
	};


	//Limit characters in input
	function doLimitInput(field, maxChar){
		var inputClass= $(field),
			inputVal = inputClass.val(),
			symbols = parseInt(maxChar - inputVal.length);
			
			inputClass.next('.limit_characters').html(symbols);
	};

	//Calculation OverAll
	function calcOverall(){
		var resultObj = {
			none: 0
		};

		for (var key in noteItemList){
			 var item = noteItemList[key];
			
			//Initialzation value
			if(resultObj[item.currency] === undefined){
				resultObj[item.currency] = 0;
			}
			
			resultObj[item.currency] += Number(item.value);
		} 

		return resultObj;
	};


	//Show Currency Values
	function showCurrencyValues(resultObj){
		
		var currencyList = {
			none: '| ',
			USD: '&#36; ',
			EUR: '&#8364; ',
			RUB: '&#8381; '
			},
			currencyArray = [],
			currencyResult = '';

		for (var key in resultObj){
			if (key !== 'none'){
				currencyArray.push(currencyList[key] + resultObj[key]);
			};
		};
		
		currencyResult = currencyArray.join(' , ');

		if (currencyResult !== ''){
			currencyResult += ' | ';
		};

		currencyResult += resultObj.none;

		$noteOverall.html(currencyResult);

	};

	//To limit characters in Description input
	function limitInput(){
		$('.desc_input').on('keyup', function(){

			var input = $(this).val();

			if (input.match(regExpSymbols)){
				input = input.substr(0, input.length -1);
			}
			
			$(this).val(input);

			doLimitInput(this, 50);
		});
	};


	//Check number in Value input
	function checkInputIsTypeNumber(){

		$('.value_input').on('keydown', function(e){

			var inputClass = $(this),
				inputVal = inputClass.val();

			if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Control' || e.key === 'Meta' || e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
                return;
            } else {
            	if (!$.isNumeric(e.key)){
            		return false;
            	}
            };
		});
	};


	function calculateAndShow(){
		var resultObj = calcOverall();
		showCurrencyValues(resultObj);
	};


	function createObjectNoteItem(value){
		
		var noteItem, 
			newId;

		noteItem = createNoteItem(value, 'Description', defaultCurrency);

			newId = counterId++;

			if(value === '' || !$.isNumeric(value)){
				noteItem['value'] = 0;
			}
		
			addNoteItemToList(newId, noteItem);
			addEntry(newId, noteItem);

			$('.note_item_wrap[data-id=' + newId +'] .value_input').val(noteItem['value']);
			$('.note_item_wrap[data-id=' + newId +'] .currency_list').val(defaultCurrency);

	};


	// Initialization of Send Value button
	$('#button_send').on('click tap', function(){

		

		// The limit on the number of lines
		if ($('.note_item_wrap').length >= 10){

			return;

		} else{

			createObjectNoteItem($fCalcValue.html());				
			
		};

		showFreeEntries();	

		//Limit input
		
		limitInput();

		checkInputIsTypeNumber();

		

	});


	//Initialization of currency select
	$noteContainer.on('change', '.currency_list', function() {

		var $itemWrap = $(this).closest('.note_item_wrap'),
			$currencyValue = $(this).val(),
			wrapperId = $itemWrap.data('id');
			
			noteItemList[wrapperId]['currency'] = $currencyValue;

			calculateAndShow();

		
	});


	// Initialization of remove button
	$noteContainer.on('click tap', '.note_item_wrap .remove', function() {

		var $self = $(this),
			$itemWrap = $self.closest('.note_item_wrap'),
			wrapperId = $itemWrap.data('id'),
			wrapperValue = noteItemList[wrapperId]['value'];
			
		$itemWrap.fadeOut(200, function() {
			
			$itemWrap.remove();	
			delete noteItemList[wrapperId];
			
			showFreeEntries();
			
			calculateAndShow();

		}); 

	});


	// Initialization of save button
	$noteContainer.on('click tap', '.note_item_wrap .save', function() {

		var $itemWrap = $(this).closest('.note_item_wrap'),
			descInputValue = $itemWrap.find('.desc_input').val(),
			numberInputValue = $itemWrap.find('.value_input').val(),
			wrapperId = $itemWrap.data('id');

			if (descInputValue === ''){

				noteItemList[wrapperId]['desc'] = '...';
				$itemWrap.find('.desc_text').html('...');

			} else {

				noteItemList[wrapperId]['desc'] = descInputValue;
				$itemWrap.find('.desc_text').html(descInputValue);
			};

			if (numberInputValue === ''){

				$itemWrap.find('.value_text').html('0');

			} else { 

				noteItemList[wrapperId]['value'] = numberInputValue;
				$itemWrap.find('.value_text ').html(numberInputValue);


			};

		$itemWrap.removeClass('add_new').removeClass('edit_item');

		calculateAndShow();
		

	});


	// Initialization of edit button
	$noteContainer.on('click tap', '.note_item_wrap .edit_desc', function() {

		$(this).closest('.note_item_wrap').addClass('edit_item');
	
	});


	// Initialization of cancel button
	$noteContainer.on('click tap', '.note_item_wrap .cancel', function() {

		$(this).closest('.note_item_wrap').removeClass('edit_item').removeClass('add_new');
	
	});


	// Initialization of delete all entries button
	$clearNoteButton.on('click tap', function() {
		var confirmDelete = confirm('Are you sure to delete all entries?');

		if (confirmDelete){
			noteItemList = {};
			$('.note_item_wrap').remove();
			
			showFreeEntries();

			calculateAndShow();

		} else {
			return;
		};
		

	});

	// Initialization of create new entry button
	$addNoteButton.on('click tap', function() {

		// The limit on the number of lines
		if ($('.note_item_wrap').length >= 10){

			return;

		} else{

			createObjectNoteItem($valueInput.val());

		};


		showFreeEntries();	

		//Limit input
		limitInput();

		//Check the input Value
		checkInputIsTypeNumber();
		
		
	});

	// Initialization of set default currency selector
	$defaultCurrencySelector.on('change', function(){
		defaultCurrency = $(this).val();
	});
	

});