require.config({
	paths: {
		'underscore': '../libs/underscore-min',
		'jquery': '../libs/jquery.min'
	},
	shim: {
		'underscore': {
			exports: '_'
		}
	}
});

require(['require'], function (require) {
    //Kickstart app loading by requiring 'main'..
    require(['main'], function(){});
});