var Image = Backbone.Model.extend({});

var ImageCollection = Backbone.Collection.extend({
	model: Image
});

var ImageCollectionView = Backbone.View.extend({
	
	initialize: function () {
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'add', this.render);
		this.setElement($('#image-list'));
	},
	
	render: function () {
		this.$el.html(this.collection.map(function (image) {
			return '<li><img src="'+ image.get('src') +'" /></li>';
		}).join(''));
		return this;
	}
	
});
