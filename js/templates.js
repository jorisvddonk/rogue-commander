/* Load all Handlebars templates and inject them into the templates scope */
/* WARNING: This is done synchronously, so that we can do everything in the head! */
define('templates', ['jquery'], function($){
	var templates = {};
	$('head link[rel=Handlebars-template]').each(function(i, elem){
		$.ajax({
			url: elem.getAttribute('src'),
			async: false
		}).done(function(data){
			templates[elem.getAttribute('templatename')] = Handlebars.compile(data);
			if (elem.getAttribute('partialname')) {
				Handlebars.registerPartial(elem.getAttribute('partialname'), templates[elem.getAttribute('templatename')]);
			}
		});
	});

	return templates;
});