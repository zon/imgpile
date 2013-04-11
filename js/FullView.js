var FullView = Backbone.View.extend({
	template: new Template('full-view'),
	
	initialize: function () {
		this.setElement($('body'));
	},
	
	showImage: function (model) {
		this.model = model;
		this.render();
	},
	
	render: function () {
		this.$el.html(this.template.render(this.model.toJSON()));
		return this;
	}
	
});
