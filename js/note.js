$(function () {
	
	//Cache DOM
	var $fCalcValue = $('#calc_value'),
		$noteContainer = $('#note_container'),
		$noteOverall = $('#note_overall'),
		noteLineTemplate = $('#note_line_template').html(),
		noteItemList = {},
		overall = counterId = 0;
		

	// Initialization of Mustach.js
	function addEntry(id, noteItem){

		//Add ID to Template Mustach.js
		var objectAssign = Object.assign({id: id}, noteItem);
		$noteContainer.append(Mustache.render(noteLineTemplate, objectAssign));
	};


	//New Object NoteItem
	var createNoteItem = function(value, desc){
		return {
				value: value,
				desc: desc,
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


	// Initialization of Send Value button
	$('#button_send').on('click', function(){
		var noteItem, 
			newId;

		// The limit on the number of lines
		if ($('.note_item_wrap').length >= 10){
			return;
		} else{
			noteItem = createNoteItem($fCalcValue.html(), 'Description');
			newId = counterId++;

			if($fCalcValue.html() === '' || !$.isNumeric($fCalcValue.html())){
				noteItem['value'] = 0;
			}
		
			addNoteItemToList(newId, noteItem);
			addEntry(newId, noteItem);
		};

		showFreeEntries();		

		overall += Number(noteItem.value);

		$noteOverall.html(overall);


		//Limit input
		$('.desc_input').on('keyup', function(){
			doLimitInput(this, 50);
		});

	});

	// Initialization of remove button
	$noteContainer.on('click', '.note_item_wrap .remove', function() {

		var $self = $(this),
			$itemWrap = $self.closest('.note_item_wrap'),
			wrapperId = $itemWrap.data('id'),
			wrapperValue = noteItemList[wrapperId]['value'];
			
		$itemWrap.fadeOut(200, function() {
			$itemWrap.remove();	
			delete noteItemList[wrapperId];
			showFreeEntries();
		}); 

		overall -= Number(wrapperValue);

		$noteOverall.html(overall);

	});

	

	// Initialization of save button
	$noteContainer.on('click', '.note_item_wrap .save', function() {
		
		var $itemWrap = $(this).closest('.note_item_wrap'),
			descInputValue = $itemWrap.find('.desc_input').val(),
			wrapperId = $itemWrap.data('id');

			if (descInputValue === ''){
				noteItemList[wrapperId]['desc'] = '...';
				$itemWrap.find('.desc_text').html('...');

			} else {
				noteItemList[wrapperId]['desc'] =  descInputValue;
				$itemWrap.find('.desc_text').html(descInputValue);
			};

		$itemWrap.removeClass('add_new').removeClass('edit_item');

	});

	// Initialization of edit button
	$noteContainer.on('click', '.note_item_wrap .edit_desc', function() {


		$(this).closest('.note_item_wrap').addClass('edit_item');
	
	});

	// Initialization of cancel button
	$noteContainer.on('click', '.note_item_wrap .cancel', function() {

		$(this).closest('.note_item_wrap').removeClass('edit_item').removeClass('add_new');
	
	});


});