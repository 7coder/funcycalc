$(function () {
	
	//Cache DOM
	var $fCalcValue = $('#calc_value'),
		$noteContainer = $('#note_container'),
		$noteOverall = $('#note_overall'),
		noteItemList = {},
		overall = counterId = 0;
		


	//Item line Mustach.js template
	var noteLineTemplate = '' +
	'<div data-id="{{id}}" class="note_item_wrap add_new clearfix">' + 
		'<div class="note_item_value">{{value}}</div>' +
		'<div class="note_item_decs">' + 
			'<div class="desc_text">{{desc}}</div>' + 
			'<div class="desc_text_edit"><input type="text" placeholder="Description" class="desc_input" value=""></div>' + 
		'</div>' +
		'<div class="note_controls clearfix">' + 
			'<div class="save_cancel">' + 
				'<button class="save">Save</button>' + 
				'<button class="cancel">Cancel</button>' + 
			'</div>' + 
			'<button class="edit">Edit</button>' + 
			'<button class="remove">Delete</button>' +
		'</div>' + 
	'</div>';

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
		
			addNoteItemToList(newId, noteItem);
			addEntry(newId, noteItem);
		};
		
		showFreeEntries();		

		overall += Number(noteItem.value);

		$noteOverall.html(overall);
	});

	// Initialization of remove button
	$noteContainer.on('click', '.note_item_wrap .remove', function() {

		var $self = $(this),
			$itemWrap = $self.closest('.note_item_wrap'),
			wrapperId = $itemWrap.data('id'),
			wrapperValue = noteItemList[wrapperId]['value'];
			
		$itemWrap.fadeOut(100, function() {
			$itemWrap.remove();	
			delete noteItemList[wrapperId];
		}); 
		
		showFreeEntries();

		overall -= Number(wrapperValue);

		$noteOverall.html(overall);

	});

	// Initialization of save button
	$noteContainer.on('click', '.note_item_wrap .save', function() {
		
		var descInputValue = $(this).parent().parent().parent().find('.desc_input').val();

		if (descInputValue === ''){
			$(this).parent().parent().parent().find('.desc_text').html('...');
		} else {
			$(this).parent().parent().parent().find('.desc_text').html(descInputValue);
		};

		$('.note_item_wrap').removeClass('add_new').removeClass('edit_item');

	});

	// Initialization of edit button
	$noteContainer.on('click', '.note_item_wrap .edit', function() {

		$('.note_item_wrap').addClass('edit_item');
	
	});

	// Initialization of cancel button
	$noteContainer.on('click', '.note_item_wrap .cancel', function() {

		$('.note_item_wrap').removeClass('edit_item');
	
	});

});