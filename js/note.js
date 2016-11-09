$(function () {
	
	//Cache DOM
	var $fCalcValue = $('#calc_value'),
		$noteContainer = $('#note_container'),
		$note_overall = $('#note_overall'),
		noteItemList = {},
		overall = counterId = 0;


	//Item line Mustach.js template
	var noteLineTemplate = '' +
	'<div data-id="{{id}}" class="note_item_wrap clearfix">' + 
	'<div class="note_item_value">{{value}}</div>' +
	'<div class="note_item_decs">{{desc}}</div>' +
	'<button class="remove">X</button></div>';

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
		
		overall += Number(noteItem.value);

		$note_overall.html(overall);
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
				console.log(noteItemList);
			}); 

			overall -= Number(wrapperValue);

			$note_overall.html(overall);

	});

});