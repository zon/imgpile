var Image = Backbone.Model.extend({});

var ImageCollection = Backbone.Collection.extend({
	model: Image
});

var ImageCollectionView = Backbone.View.extend({
	template: new Template('image-list-item'),
	
	initialize: function () {
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'add', this.render);
	},
	
	render: function () {
		this.$el.html(this.collection.map(function (image) {
			return this.template.render(image.toJSON());
		}, this).join(''));
		return this;
	}
	
});
