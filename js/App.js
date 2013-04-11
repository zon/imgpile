
var App = Backbone.View.extend({
	
	events: {
		'dragover': 'dragOverFiles',
		'drop': 'dropFiles'
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
					var name = file.name
						.replace(/\.\w+$/, '')
						.replace(/[ _\-]+/g, ' ')
						.replace(/\w\S*/g, function (w) {
							return w.charAt(0).toUpperCase() + w.substr(1);
						});
					this.images.add(new Image({
						'name': name,
						'src': e.target.result
					}));
				}, this);
				reader.readAsDataURL(file);
			}, this);
	}

});

// start the app
$(function () {new App()});
