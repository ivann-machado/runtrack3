$(document).ready(function() {
	$('button').click(function() {
		var img = $('img');
		var imgs = img.get();
		shuffled = $.map(imgs, function() {
			var rng = Math.floor(Math.random() * imgs.length);
			var randEl = $(imgs[rng]).clone(true)[0];
			imgs.splice(rng, 1);
			return randEl;
		});
		img.each(function(i) {
			$(this).replaceWith($(shuffled[i]));
		});
	});
	$( function() {
		$( "#sortable" ).sortable({
			revert: false
		});
		$( ".draggable" ).draggable({
			connectToSortable: "#sortable",
			helper: "clone",
			revert: "invalid"
		});
	} );
});