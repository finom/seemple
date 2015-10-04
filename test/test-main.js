var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
	if (TEST_REGEXP.test(file)) {
		// Normalize paths to RequireJS module names.
		allTestFiles.push(file);
	}
});

require.config({
	// Karma serves files under /base, which is the basePath from your config file
	baseUrl: '/base',
	//baseUrl: 'js/',
	paths: {
		matreshka_dir: 'src',
		matreshka: 'src/amd-modules/matreshka',
		balalaika: 'src/amd-modules/balalaika',
		xclass: 'src/amd-modules/xclass',
		'matreshka-magic': 'src/amd-modules/matreshka-magic',
		'matreshka-prod': 'matreshka',
		'matreshka-prod-min': 'matreshka.min',
		'magic-prod': 'magic/matreshka-magic',
		'magic-prod-min': 'magic/matreshka-magic.min'
	},
	// dynamically load all test files
	deps: allTestFiles,

	// we have to kickoff jasmine, as it is asynchronous
	callback: window.__karma__.start
});
