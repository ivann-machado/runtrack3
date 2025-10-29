$(document).ready(function() {
	let dropped = false;
	function initDraggables() {
		$('#source-area img.draggable').draggable({
			revert: 'invalid',
			helper: 'clone',
			start: function(event, ui) {
				dropped = false; // Reset flag
				$(this).css('visibility', 'hidden');
			},
			stop: function(event, ui) {
				if (!dropped) {
					$(this).css('visibility', 'visible');
				}
			}
		});
	}


	function initDroppables() {
		$('#droppable .drop-target').droppable({
			accept: '.draggable',
			classes: {
				'ui-droppable-hover': 'drop-target-hover'
			},

			drop: function(event, ui) {
				let slot = $(this);
				let image = $(ui.draggable);

				dropped = true;
				image.appendTo(slot);
				image.css({ top: 0, left: 0, visibility: 'visible' });
				slot.droppable('disable');
				image.draggable('disable');
				slot.addClass('slot-filled');
				checkWinCondition();
			}
		});
	}

	$('button').click(function() {
		let imagesInTarget = $('#droppable img');

		imagesInTarget.each(function() {
			let id = $(this).attr('id');
			let sourceSlot = $('#source-' + id);

			$(this).appendTo(sourceSlot);
		});

		$('#droppable .drop-target')
			.empty()
			.removeClass('slot-filled');

		$('#droppable .drop-target').droppable('enable');

		$('#source-area img').draggable('enable');

		$('#message-area').empty().removeClass('win lose');

		let imgs = $('#source-area img').get();

		for (let i = imgs.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[imgs[i], imgs[j]] = [imgs[j], imgs[i]];
		}

		$('#source-area .source-slot').each(function(index) {
			$(this).append(imgs[index]);
		});

		initDraggables();
	});

	function checkWinCondition() {
		let message = $('#message-area');
		let slots = $('#droppable .drop-target');

		if (slots.filter('.slot-filled').length === 6) {
			let isCorrect = true;
			slots.each(function(index) {
				let correctId = (index + 1).toString();
				let imageId = $(this).find('img').attr('id');

				if (imageId !== correctId) {
					isCorrect = false;
				}
			});

			if (isCorrect) {
				message.text("Vous avez gagné").removeClass('lose').addClass('win');
			}
			else {
				message.text("Vous avez perdu").removeClass('win').addClass('lose');
			}
		}
		else {
			message.empty().removeClass('win lose');
		}
	}

	initDraggables();
	initDroppables();
});