$(function () {
	
	//Cache DOM
	var $fCalcValue = $('#calc_value'),
		$noteContainer = $('#note_container'),
		$note_overall = $('#note_overall')
		$overall = 0;

	var noteLineTemplate = '' +
	'<div class="note_item_wrap clearfix">' + 
	'<div class="note_item_value">{{value}}</div>' +
	'<div class="note_item_decs">{{desc}}</div>' +
	'<div class="note_item_control">' +
	'<button class="remove">X</button></div>' +
	'</div>';

	function addEntry(noteItem){

		$noteContainer.append(Mustache.render(noteLineTemplate, noteItem));

	};

	$('#button_send').on('click', function(){

		var noteItem = {
			id: 0,
			value: $fCalcValue.html(),
			desc: 'Description',
			},
			$noteItemElement = $('.note_item_wrap');

		if ($noteItemElement.length >= 10){

			return;

		} else{
			addEntry(noteItem);

		};

		$overall += Number(noteItem.value);

		$note_overall.html($overall);

	});
});