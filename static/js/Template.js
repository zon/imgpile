
// load from document header
var Template = function(id, partials) {
	var loadFile = function(path) {
		var text = $('#'+ path.replace(/\//g, '-') +'-template').html();
		if (text) {
			return text;
		} else {
			throw new Error('Could not find "'+ path +'" template.');
		}
	};
	this.text = loadFile(id);
	if (!_.isUndefined(partials)) {
		this.partials = {};
		_.each(partials, function(v, k) {
			this.partials[k] = loadFile(v);
		}, this);
	}
};

// render template text using mustache
Template.prototype.render = function(args) {
	return Mustache.to_html(this.text, args, this.partials);
};
