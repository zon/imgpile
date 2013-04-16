var FullView = Backbone.View.extend({
    template: new Template('full-view'),
	
	events: {
		'click #full-back': 'back',
		'focus #full-view input': 'inputFocus',
		'blur #full-view input': 'inputBlur',
		'keyup #full-view input': 'inputChange',
		'change #full-view input': 'inputChange'
	},
	
	initialize: function () {
		this.setElement($('body'));
	},
	
	showImage: function (model) {
		this.model = model;
		this.render();
	},
	
	back: function () {
		app.render();
	},
	
	inputFocus: function (event) {
		var target = $(event.target);
		if (target.hasClass('empty')) {
			target.removeClass('empty');
			target.val('');
		}
	},
	
	inputBlur: function (event) {
		var target = $(event.target);
		if (!target.val()) {
			target.addClass('empty');
			var name = target.attr('name');
			target.val(name.charAt(0).toUpperCase() + name.slice(1));
		}
	},
	
	inputChange: function (event) {
		var target = $(event.target);
		var name = target.attr('name');
		this.model.set(name, target.val());
        this.model.save();
	},
	
	render: function () {
		this.$el.html(this.template.render(this.model.toJSON()));
		return this;
	}
	
});