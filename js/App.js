
var App = Backbone.View.extend({
	
	events: {
		'dragover #image-upload': 'dragOverFiles',
		'drop #image-upload': 'dropFiles'
	},
	
	initialize: function () {
		this.setElement($('body'));
		
		console.log('INIT');
		
	},
	
	// warn browser files should drop
	dragOverFiles: function (event) {
		event.preventDefault();
		event.stopPropagation();
		event.originalEvent.dataTransfer.dropEffect = 'copy';
	},
	
	// read dropped images
	dropFiles: function (event) {
		event.preventDefault();
		event.stopPropagation();
		
		// read dropped images
		var files = _.chain(event.originalEvent.dataTransfer.files)
			.filter(function (file) {
				return file.type.match(/image\/.+/);
			})
			.map(function (file) {
				var reader = new FileReader();
				reader.onload = (function (f) {
					
				})(file);
				
				return file.name;
				
			})
			.value();
		
		console.log(files);
	}

});

// start the app
$(function () {new App()});
