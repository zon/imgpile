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
			var json = image.toJSON();
			return [
				'<li><img src="',
				json.src,
				'" /><span class="name">',
				json.name,
				'</li>'
			].join('');
		}).join(''));
		return this;
	}
	
});
