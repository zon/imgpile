var Image = Backbone.Model.extend({
    url: '/api/images'
});

var ImageCollection = Backbone.Collection.extend({
    model: Image
});

var ImageCollectionView = Backbone.View.extend({
	template: new Template('image-list-item'),
	
	events: {
		'click li': 'fullView'
	},
	
	initialize: function () {
		this.listenTo(this.collection, 'add', this.addImage);
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'add', this.render);
	},
	
	render: function () {
		this.$el.html(this.collection.map(function (image) {
			var json = image.toJSON();
			json.cid = image.cid;
			return this.template.render(json);
		}, this).join(''));
		return this;
	},
	
	fullView: function (event) {
		var target = $(event.target);
		if (target[0].nodeName != 'li') {
			target = target.parents('li');
		}
		var item = this.collection.get(target.attr('id'));
		app.full.showImage(item);
	},

    addImage: function (image) {
    	var src = image.get('src');
    	image.unset('src', {silent: true});
        image.save();
        image.set('src', src);
    }
	
});
