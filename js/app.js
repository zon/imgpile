$(function () {
	
	console.log('READY');
	
	// handle files dropped anywhere on the page
	$('#image-upload')
		.on('dragenter', function (event) {
			event.preventDefault();
			event.stopPropagation();
		})
		.on('dragover', function (event) {
			event.preventDefault();
			event.stopPropagation();
		})
		.on('dragleave', function (event) {
			event.preventDefault();
			event.stopPropagation();
		})
		.on('drop', function (event) {
			event.preventDefault();
			event.stopPropagation();
			
			console.log('DROP', event);
			
		});
	
});
