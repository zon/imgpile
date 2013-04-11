
var App = Backbone.View.extend({
	
	events: {
		'dragover #image-upload': 'dragOverFiles',
		'drop #image-upload': 'dropFiles'
	},
	
	initialize: function () {
		this.images = new ImageCollection();
		this.children = {
			images: new ImageCollectionView({collection: this.images})
		};
		this.setElement($('body'));
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
		var files = _.chain(event.originalEvent.dataTransfer.files)
			.filter(function (file) {
				return file.type.match(/image\/.+/);
			})
			.each(function (file) {
				var reader = new FileReader();
				reader.onload = _.bind(function (e) {
					this.images.add(new Image({
						'name': '',
						'src': e.target.result
					}));
				}, this);
				reader.readAsDataURL(file);
			}, this);
	}

});

// start the app
$(function () {new App()});
