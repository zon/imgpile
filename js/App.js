
var App = Backbone.View.extend({
	template: new Template('body'),
	upload: '#image-upload',
	
	events: {
		'dragover': 'dragOverFiles',
		'drop': 'dropFiles',
		'dragleave': 'dragLeave'
	},
	
	initialize: function () {
		this.images = new ImageCollectionView({
			collection: new ImageCollection()
		});
		this.setElement($('body'));
		this.render();
	},
	
	render: function () {
		this.$el.html(this.template.render());
		this.images.setElement('#image-list');
		return this;
	},
	
	// warn browser files should drop
	dragOverFiles: function (event) {
		event.preventDefault();
		event.stopPropagation();
		event.originalEvent.dataTransfer.dropEffect = 'copy';
		$(this.upload).addClass('drag');
	},
	
	// read dropped images
	dropFiles: function (event) {
		event.preventDefault();
		event.stopPropagation();
		$(this.upload).removeClass('drag');
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
					this.images.collection.add(new Image({
						'name': name,
						'src': e.target.result
					}));
				}, this);
				reader.readAsDataURL(file);
			}, this);
	},
	
	dragLeave: function (event) {
		$(this.upload).removeClass('drag');
	}

});

// start the app
$(function () {new App()});
