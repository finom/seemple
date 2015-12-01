//yep, Matreshka works in node as well

var MK = require('matreshka'),
	object = {a: {b: {c : 1}}};

MK.on(object,'a.b@change:c', function(evt) {
	console.log('c is changed to ' + evt.value);
});

object.a.b.c = 42; // c is changed to 42