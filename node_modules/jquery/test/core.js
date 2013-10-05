var testCase = require('nodeunit').testCase,
jsdom = require('jsdom').jsdom,
static_document = require('fs').readFileSync('test/fixtures/core.html', 'utf8');

// need to be global as helpers access these variables
window = document = jQuery = $ = null;

var helpers = require('./helpers/helper'),
q = helpers.query_ids;

module.exports = testCase({
	setUp: function (callback) {
		jQuery = $ =  helpers.recreate_doc(static_document);
		callback();
	},
	tearDown: function (callback) {
		// clean up
		callback();
	},
	"Basic requirements": function(test) {
		test.expect(7);
		test.ok( Array.prototype.push, "Array.push()" );
		test.ok( Function.prototype.apply, "Function.apply()" );
		test.ok( document.getElementById, "getElementById" );
		test.ok( document.getElementsByTagName, "getElementsByTagName" );
		test.ok( RegExp, "RegExp" );
		test.ok( jQuery, "jQuery" );
		test.ok( $, "$" );
		test.done();	
	},
	"jQuery()": function(test) {
		test.expect(24);
		// Basic constructor's behavior

		test.equals( jQuery().length, 0, "jQuery() === jQuery([])" );
		test.equals( jQuery(undefined).length, 0, "jQuery(undefined) === jQuery([])" );
		test.equals( jQuery(null).length, 0, "jQuery(null) === jQuery([])" );
		test.equals( jQuery("").length, 0, "jQuery('') === jQuery([])" );

		var obj = jQuery("div");
		test.equals( jQuery(obj).selector, "div", "jQuery(jQueryObj) == jQueryObj" );

		// can actually yield more than one, when iframes are included, the window is an array as well
		test.equals( jQuery(window).length, 1, "Correct number of elements generated for jQuery(window)" );


		var main = jQuery("#main");
		test.same( jQuery("div p", main).get(), q("sndp", "en", "sap"), "Basic selector with jQuery object as context" );

		/*
		// disabled since this test was doing nothing. i tried to fix it but i'm not sure
		// what the expected behavior should even be. FF returns "\n" for the text node
		// make sure this is handled
		var crlfContainer = jQuery('<p>\r\n</p>');
		var x = crlfContainer.contents().get(0).nodeValue;
		equals( x, what???, "Check for \\r and \\n in jQuery()" );
		*/

		/* // Disabled until we add this functionality in
		var pass = true;
		try {
		jQuery("<div>Testing</div>").appendTo(document.getElementById("iframe").contentDocument.body);
		} catch(e){
		pass = false;
		}
		ok( pass, "jQuery('&lt;tag&gt;') needs optional document parameter to ease cross-frame DOM wrangling, see #968" );*/

		var code = jQuery("<code/>");
		test.equals( code.length, 1, "Correct number of elements generated for code" );
		test.equals( code.parent().length, 0, "Make sure that the generated HTML has no parent." );
		var img = jQuery("<img/>");
		test.equals( img.length, 1, "Correct number of elements generated for img" );
		test.equals( img.parent().length, 0, "Make sure that the generated HTML has no parent." );
		var div = jQuery("<div/><hr/><code/><b/>");
		test.equals( div.length, 4, "Correct number of elements generated for div hr code b" );
		test.equals( div.parent().length, 0, "Make sure that the generated HTML has no parent." );

		test.equals( jQuery([1,2,3]).get(1), 2, "Test passing an array to the factory" );

		test.equals( jQuery(document.body).get(0), jQuery('body').get(0), "Test passing an html node to the factory" );

		var exec = false;

		var elem = jQuery("<div/>", {
			width: 10,
			css: { paddingLeft:1, paddingRight:1 },
			click: function(){ test.ok(exec, "Click executed."); },
			text: "test",
			"class": "test2",
			id: "test3"
		});

		test.equals( elem[0].style.width, '10px', 'jQuery() quick setter width');
		test.equals( elem[0].style.paddingLeft, '1px', 'jQuery quick setter css');
		test.equals( elem[0].style.paddingRight, '1px', 'jQuery quick setter css');
		test.equals( elem[0].childNodes.length, 1, 'jQuery quick setter text');
		test.equals( elem[0].firstChild.nodeValue, "test", 'jQuery quick setter text');
		test.equals( elem[0].className, "test2", 'jQuery() quick setter class');
		test.equals( elem[0].id, "test3", 'jQuery() quick setter id');

		exec = true;
		elem.click();

		// manually clean up detached elements
		elem.remove();

		for ( var i = 0; i < 3; ++i ) {
			elem = jQuery("<input type='text' value='TEST' />");
		}
		test.equals( elem[0].defaultValue, "TEST", "Ensure cached nodes are cloned properly (Bug #6655)" );

		// manually clean up detached elements
		elem.remove();
		test.done();
	},
	"selector state": function(test) {
		test.expect(31);

		var elem;

		elem = jQuery(undefined);
		test.equals( elem.selector, "", "Empty jQuery Selector" );
		test.equals( elem.context, undefined, "Empty jQuery Context" );

		elem = jQuery(document);
		test.equals( elem.selector, "", "Document Selector" );
		test.equals( elem.context, document, "Document Context" );

		elem = jQuery(document.body);
		test.equals( elem.selector, "", "Body Selector" );
		test.equals( elem.context, document.body, "Body Context" );

		elem = jQuery("#main");
		test.equals( elem.selector, "#main", "#main Selector" );
		test.equals( elem.context, document, "#main Context" );

		elem = jQuery("#notfoundnono");
		test.equals( elem.selector, "#notfoundnono", "#notfoundnono Selector" );
		test.equals( elem.context, document, "#notfoundnono Context" );

		elem = jQuery("#main", document);
		test.equals( elem.selector, "#main", "#main Selector" );
		test.equals( elem.context, document, "#main Context" );

		elem = jQuery("#main", document.body);
		test.equals( elem.selector, "#main", "#main Selector" );
		test.equals( elem.context, document.body, "#main Context" );

		// Test cloning
		elem = jQuery(elem);
		test.equals( elem.selector, "#main", "#main Selector" );
		test.equals( elem.context, document.body, "#main Context" );

		elem = jQuery(document.body).find("#main");
		test.equals( elem.selector, "#main", "#main find Selector" );
		test.equals( elem.context, document.body, "#main find Context" );

		elem = jQuery("#main").filter("div");
		test.equals( elem.selector, "#main.filter(div)", "#main filter Selector" );
		test.equals( elem.context, document, "#main filter Context" );

		elem = jQuery("#main").not("div");
		test.equals( elem.selector, "#main.not(div)", "#main not Selector" );
		test.equals( elem.context, document, "#main not Context" );

		elem = jQuery("#main").filter("div").not("div");
		test.equals( elem.selector, "#main.filter(div).not(div)", "#main filter, not Selector" );
		test.equals( elem.context, document, "#main filter, not Context" );

		elem = jQuery("#main").filter("div").not("div").end();
		test.equals( elem.selector, "#main.filter(div)", "#main filter, not, end Selector" );
		test.equals( elem.context, document, "#main filter, not, end Context" );

		elem = jQuery("#main").parent("body");
		test.equals( elem.selector, "#main.parent(body)", "#main parent Selector" );
		test.equals( elem.context, document, "#main parent Context" );

		elem = jQuery("#main").eq(0);
		test.equals( elem.selector, "#main.slice(0,1)", "#main eq Selector" );
		test.equals( elem.context, document, "#main eq Context" );

		var d = "<div />";
		test.equals(
			jQuery(d).appendTo(jQuery(d)).selector,
			jQuery(d).appendTo(d).selector,
			"manipulation methods make same selector for jQuery objects"
		);
		test.done();
	},
	"noConflict": function(test) {
		test.expect(7);

		var originaljQuery = jQuery,
		original$ = $,
		$$ = jQuery;

		test.equals( jQuery, jQuery.noConflict(), "noConflict returned the jQuery object" );
		test.equals( jQuery, $$, "Make sure jQuery wasn't touched." );
		test.equals( $, original$, "Make sure $ was reverted." );

		jQuery = $ = $$;

		test.equals( jQuery.noConflict(true), $$, "noConflict returned the jQuery object" );
		test.equals( jQuery, originaljQuery, "Make sure jQuery was reverted." );
		test.equals( $, original$, "Make sure $ was reverted." );
		test.ok( $$("#main").html("test"), "Make sure that jQuery still works." );

		jQuery = $$;
		test.done();
	},

	"trim": function(test) {
		test.expect(9);

		var nbsp = String.fromCharCode(160);

		test.equals( jQuery.trim("hello  "), "hello", "trailing space" );
		test.equals( jQuery.trim("  hello"), "hello", "leading space" );
		test.equals( jQuery.trim("  hello   "), "hello", "space on both sides" );
		test.equals( jQuery.trim("  " + nbsp + "hello  " + nbsp + " "), "hello", "&nbsp;" );

		test.equals( jQuery.trim(), "", "Nothing in." );
		test.equals( jQuery.trim( undefined ), "", "Undefined" );
		test.equals( jQuery.trim( null ), "", "Null" );
		test.equals( jQuery.trim( 5 ), "5", "Number" );
		test.equals( jQuery.trim( false ), "false", "Boolean" );
		test.done();
	},
	"type": function(test) {
		test.expect(23);

		test.equals( jQuery.type(null), "null", "null" );
		test.equals( jQuery.type(undefined), "undefined", "undefined" );
		test.equals( jQuery.type(true), "boolean", "Boolean" );
		test.equals( jQuery.type(false), "boolean", "Boolean" );
		test.equals( jQuery.type(Boolean(true)), "boolean", "Boolean" );
		test.equals( jQuery.type(0), "number", "Number" );
		test.equals( jQuery.type(1), "number", "Number" );
		test.equals( jQuery.type(Number(1)), "number", "Number" );
		test.equals( jQuery.type(""), "string", "String" );
		test.equals( jQuery.type("a"), "string", "String" );
		test.equals( jQuery.type(String("a")), "string", "String" );
		test.equals( jQuery.type({}), "object", "Object" );
		test.equals( jQuery.type(/foo/), "regexp", "RegExp" );
		test.equals( jQuery.type(new RegExp("asdf")), "regexp", "RegExp" );
		test.equals( jQuery.type([1]), "array", "Array" );
		test.equals( jQuery.type(new Date()), "date", "Date" );
		test.equals( jQuery.type(new Function("return;")), "function", "Function" );
		test.equals( jQuery.type(function(){}), "function", "Function" );
		test.equals( jQuery.type(window), "object", "Window" );
		test.equals( jQuery.type(document), "object", "Document" );
		test.equals( jQuery.type(document.body), "object", "Element" );
		test.equals( jQuery.type(document.createTextNode("foo")), "object", "TextNode" );
		test.equals( jQuery.type(document.getElementsByTagName("*")), "object", "NodeList" );
		test.done();
	},
	"isPlainObject": function(test) {
		test.expect(13);

		// The use case that we want to match
		test.ok(jQuery.isPlainObject({}), "{}");

		// Not objects shouldn't be matched
		test.ok(!jQuery.isPlainObject(""), "string");
		test.ok(!jQuery.isPlainObject(0) && !jQuery.isPlainObject(1), "number");
		test.ok(!jQuery.isPlainObject(true) && !jQuery.isPlainObject(false), "boolean");
		test.ok(!jQuery.isPlainObject(null), "null");
		test.ok(!jQuery.isPlainObject(undefined), "undefined");

		// Arrays shouldn't be matched
		test.ok(!jQuery.isPlainObject([]), "array");

		// Instantiated objects shouldn't be matched
		test.ok(!jQuery.isPlainObject(new Date), "new Date");

		var fn = function(){};

		// Functions shouldn't be matched
		test.ok(!jQuery.isPlainObject(fn), "fn");

		// Again, instantiated objects shouldn't be matched
		test.ok(!jQuery.isPlainObject(new fn), "new fn (no methods)");

		// Makes the function a little more realistic
		// (and harder to detect, incidentally)
		fn.prototype = {someMethod: function(){}};

		// Again, instantiated objects shouldn't be matched
		test.ok(!jQuery.isPlainObject(new fn), "new fn");

		// DOM Element
		test.ok(!jQuery.isPlainObject(document.createElement("div")), "DOM Element");

		// Window
		test.ok(!jQuery.isPlainObject(window), "window");

		/* XXX removed iframe test */
		test.done();
	},
	"isFunction": function(test) {
		test.expect(19);

		// Make sure that false values return false
		test.ok( !jQuery.isFunction(), "No Value" );
		test.ok( !jQuery.isFunction( null ), "null Value" );
		test.ok( !jQuery.isFunction( undefined ), "undefined Value" );
		test.ok( !jQuery.isFunction( "" ), "Empty String Value" );
		test.ok( !jQuery.isFunction( 0 ), "0 Value" );

		// Check built-ins
		// Safari uses "(Internal Function)"
		test.ok( jQuery.isFunction(String), "String Function("+String+")" );
		test.ok( jQuery.isFunction(Array), "Array Function("+Array+")" );
		test.ok( jQuery.isFunction(Object), "Object Function("+Object+")" );
		test.ok( jQuery.isFunction(Function), "Function Function("+Function+")" );

		// When stringified, this could be misinterpreted
		var mystr = "function";
		test.ok( !jQuery.isFunction(mystr), "Function String" );

		// When stringified, this could be misinterpreted
		var myarr = [ "function" ];
		test.ok( !jQuery.isFunction(myarr), "Function Array" );

		// When stringified, this could be misinterpreted
		var myfunction = { "function": "test" };
		test.ok( !jQuery.isFunction(myfunction), "Function Object" );

		// Make sure normal functions still work
		var fn = function(){};
		test.ok( jQuery.isFunction(fn), "Normal Function" );

		var obj = document.createElement("object");

		// Firefox says this is a function
		test.ok( !jQuery.isFunction(obj), "Object Element" );

		// IE says this is an object
		// Since 1.3, this isn't supported (#2968)
		//test.ok( jQuery.isFunction(obj.getAttribute), "getAttribute Function" );

		var nodes = document.body.childNodes;

		// Safari says this is a function
		test.ok( !jQuery.isFunction(nodes), "childNodes Property" );

		var first = document.body.firstChild;

		// Normal elements are reported test.ok everywhere
		test.ok( !jQuery.isFunction(first), "A normal DOM Element" );

		var input = document.createElement("input");
		input.type = "text";
		document.body.appendChild( input );

		// IE says this is an object
		// Since 1.3, this isn't supported (#2968)
		//test.ok( jQuery.isFunction(input.focus), "A default function property" );

		document.body.removeChild( input );

		var a = document.createElement("a");
		a.href = "some-function";
		document.body.appendChild( a );

		// This serializes with the word 'function' in it
		test.ok( !jQuery.isFunction(a), "Anchor Element" );

		document.body.removeChild( a );

		// Recursive function calls have lengths and array-like properties
		function callme(callback){
			function fn(response){
				callback(response);
			}

			test.ok( jQuery.isFunction(fn), "Recursive Function Call" );

			fn({ some: "data" });
		};

		callme(function(){
			callme(function(){});
		});
		test.done();
	},
	"isXMLDoc - HTML": function(test) {
		test.expect(4);

		test.ok( !jQuery.isXMLDoc( document ), "HTML document" );
		test.ok( !jQuery.isXMLDoc( document.documentElement ), "HTML documentElement" );
		test.ok( !jQuery.isXMLDoc( document.body ), "HTML Body Element" );

		var iframe = document.createElement("iframe");
		document.body.appendChild( iframe );

		try {
			var body = jQuery(iframe).contents()[0];

			try {
				test.ok( !jQuery.isXMLDoc( body ), "Iframe body element" );
			} catch(e) {
				test.ok( false, "Iframe body element exception" );
			}

		} catch(e) {
			test.ok( true, "Iframe body element - iframe not working correctly" );
		}

		test.done();
	},
	"jQuery('html')": function(test) {
		test.expect(15);

		jQuery.foo = false;
		var s = jQuery("<script>jQuery.foo='test';</script>")[0];
		test.ok( s, "Creating a script" );
		test.ok( !jQuery.foo, "Make sure the script wasn't executed prematurely" );
		jQuery("body").append("<script>jQuery.foo='test';</script>");
		test.ok( jQuery.foo, "Executing a scripts contents in the right context" );

		// Test multi-line HTML
		var div = jQuery("<div>\r\nsome text\n<p>some p</p>\nmore text\r\n</div>")[0];
		test.equals( div.nodeName.toUpperCase(), "DIV", "Make sure we're getting a div." );
		test.equals( div.firstChild.nodeType, 3, "Text node." );
		test.equals( div.lastChild.nodeType, 3, "Text node." );
		test.equals( div.childNodes[1].nodeType, 1, "Paragraph." );
		test.equals( div.childNodes[1].firstChild.nodeType, 3, "Paragraph text." );

		test.ok( jQuery("<link rel='stylesheet'/>")[0], "Creating a link" );

		test.ok( !jQuery("<script/>")[0].parentNode, "Create a script" );

		test.ok( jQuery("<input/>").attr("type", "hidden"), "Create an input and set the type." );

		var j = jQuery("<span>hi</span> there <!-- mon ami -->");
		test.ok( j.length >= 2, "Check node,textnode,comment creation (some browsers delete comments)" );

		test.ok( !jQuery("<option>test</option>")[0].selected, "Make sure that options are auto-selected #2050" );

		test.ok( jQuery("<div></div>")[0], "Create a div with closing tag." );
		test.ok( jQuery("<table></table>")[0], "Create a table with closing tag." );

		test.done();
	},
  "create script tag": function (test) {
    var src = null, dom;
    test.expect(1);
    dom = jsdom('<script src="none.js" type="text/javascript"></script>');
    src = jQuery('script', dom).attr('src'); 
    test.equals(src, 'none.js', 'script should return proper src attribute');
    test.done();
  },
	"jQuery('html', context)": function(test) {
		test.expect(1);

		var $div = jQuery("<div/>")[0];
		var $span = jQuery("<span/>", $div);
		test.equals($span.length, 1, "Verify a span created with a div context works, #1763");
		test.done();
	},
	"text()": function(test) {
		test.expect(2);
		test.equals("Yahoo", jQuery("#yahoo").text(), "check for text in anchor");
		test.equals("Everything inside the red border is inside a div with id=\"foo\".", jQuery("#sndp").text(), "check for text in complex paragraph");
		test.done();
	},
	"end()": function(test) {
		test.expect(3);
		test.equals( 'Yahoo', jQuery('#yahoo').parent().end().text(), 'Check for end' );
		test.ok( jQuery('#yahoo').end(), 'Check for end with nothing to end' );

		var x = jQuery('#yahoo');
		x.parent();
		test.equals( 'Yahoo', jQuery('#yahoo').text(), 'Check for non-destructive behaviour' );
		test.done();
	},

	"length": function(test) {
		test.expect(1);
		test.equals( jQuery("#main p").length, 6, "Get Number of Elements Found" );
		test.done();
	},

	"size()": function(test) {
		test.expect(1);
		test.equals( jQuery("#main p").size(), 6, "Get Number of Elements Found" );
		test.done();
	},

	"get()": function(test) {
		test.expect(1);
		test.same( jQuery("#main p").get(), q("firstp","ap","sndp","en","sap","first"), "Get All Elements" );
		test.done();
	},

	"toArray()": function(test) {
		test.expect(1);
		test.same( jQuery("#main p").toArray(),
		q("firstp","ap","sndp","en","sap","first"),
		"Convert jQuery object to an Array" )
		test.done();
	},

	"get(Number)": function(test) {
		test.expect(2);
		test.equals( jQuery("#main p").get(0), document.getElementById("firstp"), "Get A Single Element" );
		test.strictEqual( jQuery("#firstp").get(1), undefined, "Try get with index larger elements count" );
		test.done();
	},

	"get(-Number)": function(test) {
		test.expect(2);
		test.equals( jQuery("p").get(-1), document.getElementById("first"), "Get a single element with negative index" );
		test.strictEqual( jQuery("#firstp").get(-2), undefined, "Try get with index negative index larger then elements count" );
		test.done();
	},

  "attr()": function(test) {
    var e = null;
		test.expect(4);
		test.equals( jQuery('#input1').attr('name'), 'PWD', "Get form element name attribute" );
    test.equals( jQuery('#input2').attr('name'), 'T1', "Get form element name attribute" );
    test.equals( jQuery('item').attr('name'), 'test val', "Get name attribute from element" );
    e = jsdom('<element name="dude" age="25">content</element>');
    test.equals( jQuery('element', e).attr('name'), 'dude', "Get name attribute from element" );
		test.done();
  },

	"each(Function)": function(test) {
		test.expect(1);
		var div = jQuery("div");
		div.each(function(){this.foo = 'zoo';});
		var pass = true;
		for ( var i = 0; i < div.size(); i++ ) {
			if ( div.get(i).foo != "zoo" ) pass = false;
		}
		test.ok( pass, "Execute a function, Relative" );
		test.done();
	},

	"slice()": function(test) {
		test.expect(7);

		var $links = jQuery("#ap a");

		test.same( $links.slice(1,2).get(), q("groups"), "slice(1,2)" );
		test.same( $links.slice(1).get(), q("groups", "anchor1", "mark"), "slice(1)" );
		test.same( $links.slice(0,3).get(), q("google", "groups", "anchor1"), "slice(0,3)" );
		test.same( $links.slice(-1).get(), q("mark"), "slice(-1)" );

		test.same( $links.eq(1).get(), q("groups"), "eq(1)" );
		test.same( $links.eq('2').get(), q("anchor1"), "eq('2')" );
		test.same( $links.eq(-1).get(), q("mark"), "eq(-1)" );
		test.done();
	},

	"first()/last()": function(test) {
		test.expect(4);

		var $links = jQuery("#ap a"), $none = jQuery("asdf");

		test.same( $links.first().get(), q("google"), "first()" );
		test.same( $links.last().get(), q("mark"), "last()" );

		test.same( $none.first().get(), [], "first() none" );
		test.same( $none.last().get(), [], "last() none" );
		test.done();
	},

	"map()": function(test) {
		test.expect(2);//test.expect(6);

		test.same(
			jQuery("#ap").map(function(){
				return jQuery(this).find("a").get();
			}).get(),
			q("google", "groups", "anchor1", "mark"),
			"Array Map"
		);

		test.same(
			jQuery("#ap > a").map(function(){
				return this.parentNode;
			}).get(),
			q("ap","ap","ap"),
			"Single Map"
		);
		test.done();

		return;//these haven't been accepted yet

		//for #2616
		var keys = jQuery.map( {a:1,b:2}, function( v, k ){
			return k;
		}, [ ] );

		test.equals( keys.join(""), "ab", "Map the keys from a hash to an array" );

		var values = jQuery.map( {a:1,b:2}, function( v, k ){
			return v;
		}, [ ] );

		test.equals( values.join(""), "12", "Map the values from a hash to an array" );

		var scripts = document.getElementsByTagName("script");
		var mapped = jQuery.map( scripts, function( v, k ){
			return v;
		}, {length:0} );

		test.equals( mapped.length, scripts.length, "Map an array(-like) to a hash" );

		var flat = jQuery.map( Array(4), function( v, k ){
			return k % 2 ? k : [k,k,k];//try mixing array and regular returns
		});

		test.equals( flat.join(""), "00012223", "try the new flatten technique(#2616)" );
	},

	"jQuery.merge()": function(test) {
		test.expect(8);

		var parse = jQuery.merge;

		test.same( parse([],[]), [], "Empty arrays" );

		test.same( parse([1],[2]), [1,2], "Basic" );
		test.same( parse([1,2],[3,4]), [1,2,3,4], "Basic" );

		test.same( parse([1,2],[]), [1,2], "Second empty" );
		test.same( parse([],[1,2]), [1,2], "First empty" );

		// Fixed at [5998], #3641
		test.same( parse([-2,-1], [0,1,2]), [-2,-1,0,1,2], "Second array including a zero (falsy)");

		// After fixing #5527
		test.same( parse([], [null, undefined]), [null, undefined], "Second array including null and undefined values");
		test.same( parse({length:0}, [1,2]), {length:2, 0:1, 1:2}, "First array like");
		test.done();
	},

	"jQuery.extend(Object, Object)": function(test) {
		test.expect(28);

		var settings = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
		options = { xnumber2: 1, xstring2: "x", xxx: "newstring" },
		optionsCopy = { xnumber2: 1, xstring2: "x", xxx: "newstring" },
		merged = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "x", xxx: "newstring" },
		deep1 = { foo: { bar: true } },
		deep1copy = { foo: { bar: true } },
		deep2 = { foo: { baz: true }, foo2: document },
		deep2copy = { foo: { baz: true }, foo2: document },
		deepmerged = { foo: { bar: true, baz: true }, foo2: document },
		arr = [1, 2, 3],
		nestedarray = { arr: arr };

		jQuery.extend(settings, options);
		test.same( settings, merged, "Check if extended: settings must be extended" );
		test.same( options, optionsCopy, "Check if not modified: options must not be modified" );

		jQuery.extend(settings, null, options);
		test.same( settings, merged, "Check if extended: settings must be extended" );
		test.same( options, optionsCopy, "Check if not modified: options must not be modified" );

		jQuery.extend(true, deep1, deep2);
		test.same( deep1.foo, deepmerged.foo, "Check if foo: settings must be extended" );
		test.same( deep2.foo, deep2copy.foo, "Check if not deep2: options must not be modified" );
		test.equals( deep1.foo2, document, "Make sure that a deep clone was not attempted on the document" );

		test.ok( jQuery.extend(true, {}, nestedarray).arr !== arr, "Deep extend of object must clone child array" );

		// #5991
		test.ok( jQuery.isArray( jQuery.extend(true, { arr: {} }, nestedarray).arr ), "Cloned array heve to be an Array" );
		test.ok( jQuery.isPlainObject( jQuery.extend(true, { arr: arr }, { arr: {} }).arr ), "Cloned object heve to be an plain object" );

		var empty = {};
		var optionsWithLength = { foo: { length: -1 } };
		jQuery.extend(true, empty, optionsWithLength);
		test.same( empty.foo, optionsWithLength.foo, "The length property must copy correctly" );

		empty = {};
		var optionsWithDate = { foo: { date: new Date } };
		jQuery.extend(true, empty, optionsWithDate);
		test.same( empty.foo, optionsWithDate.foo, "Dates copy correctly" );

		var myKlass = function() {};
		var customObject = new myKlass();
		var optionsWithCustomObject = { foo: { date: customObject } };
		empty = {};
		jQuery.extend(true, empty, optionsWithCustomObject);
		test.ok( empty.foo && empty.foo.date === customObject, "Custom objects copy correctly (no methods)" );

		// Makes the class a little more realistic
		myKlass.prototype = { someMethod: function(){} };
		empty = {};
		jQuery.extend(true, empty, optionsWithCustomObject);
		test.ok( empty.foo && empty.foo.date === customObject, "Custom objects copy correctly" );

		var ret = jQuery.extend(true, { foo: 4 }, { foo: new Number(5) } );
		test.ok( ret.foo == 5, "Wrapped numbers copy correctly" );

		var nullUndef;
		nullUndef = jQuery.extend({}, options, { xnumber2: null });
		test.ok( nullUndef.xnumber2 === null, "Check to make sure null values are copied");

		nullUndef = jQuery.extend({}, options, { xnumber2: undefined });
		test.ok( nullUndef.xnumber2 === options.xnumber2, "Check to make sure undefined values are not copied");

		nullUndef = jQuery.extend({}, options, { xnumber0: null });
		test.ok( nullUndef.xnumber0 === null, "Check to make sure null values are inserted");

		var target = {};
		var recursive = { foo:target, bar:5 };
		jQuery.extend(true, target, recursive);
		test.same( target, { bar:5 }, "Check to make sure a recursive obj doesn't go never-ending loop by not copying it over" );

		var ret = jQuery.extend(true, { foo: [] }, { foo: [0] } ); // 1907
		test.equals( ret.foo.length, 1, "Check to make sure a value with coersion 'false' copies over when necessary to fix #1907" );

		var ret = jQuery.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] } );
		test.ok( typeof ret.foo != "string", "Check to make sure values equal with coersion (but not actually equal) overwrite correctly" );

		var ret = jQuery.extend(true, { foo:"bar" }, { foo:null } );
		test.ok( typeof ret.foo !== 'undefined', "Make sure a null value doesn't crash with deep extend, for #1908" );

		var obj = { foo:null };
		jQuery.extend(true, obj, { foo:"notnull" } );
		test.equals( obj.foo, "notnull", "Make sure a null value can be overwritten" );

		function func() {}
		jQuery.extend(func, { key: "value" } );
		test.equals( func.key, "value", "Verify a function can be extended" );

		var defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
		defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
		options1 = { xnumber2: 1, xstring2: "x" },
		options1Copy = { xnumber2: 1, xstring2: "x" },
		options2 = { xstring2: "xx", xxx: "newstringx" },
		options2Copy = { xstring2: "xx", xxx: "newstringx" },
		merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

		var settings = jQuery.extend({}, defaults, options1, options2);
		test.same( settings, merged2, "Check if extended: settings must be extended" );
		test.same( defaults, defaultsCopy, "Check if not modified: options1 must not be modified" );
		test.same( options1, options1Copy, "Check if not modified: options1 must not be modified" );
		test.same( options2, options2Copy, "Check if not modified: options2 must not be modified" );
		test.done();
	},

	"jQuery.each(Object,Function)": function(test) {
		test.expect(13);
		jQuery.each( [0,1,2], function(i, n){
			test.equals( i, n, "Check array iteration" );
		});

		jQuery.each( [5,6,7], function(i, n){
			test.equals( i, n - 5, "Check array iteration" );
		});

		jQuery.each( { name: "name", lang: "lang" }, function(i, n){
			test.equals( i, n, "Check object iteration" );
		});

		var total = 0;
		jQuery.each([1,2,3], function(i,v){ total += v; });
		test.equals( total, 6, "Looping over an array" );
		total = 0;
		jQuery.each([1,2,3], function(i,v){ total += v; if ( i == 1 ) return false; });
		test.equals( total, 3, "Looping over an array, with break" );
		total = 0;
		jQuery.each({"a":1,"b":2,"c":3}, function(i,v){ total += v; });
		test.equals( total, 6, "Looping over an object" );
		total = 0;
		jQuery.each({"a":3,"b":3,"c":3}, function(i,v){ total += v; return false; });
		test.equals( total, 3, "Looping over an object, with break" );

		var f = function(){};
		f.foo = 'bar';
		jQuery.each(f, function(i){
			f[i] = 'baz';
		});
		test.equals( "baz", f.foo, "Loop over a function" );
		test.done();
	},

	"jQuery.makeArray": function(test){
		test.expect(17);

		test.equals( jQuery.makeArray(jQuery('html>*'))[0].nodeName.toUpperCase(), "HEAD", "Pass makeArray a jQuery object" );

		test.equals( jQuery.makeArray(document.getElementsByName("PWD")).slice(0,1)[0].name, "PWD", "Pass makeArray a nodelist" );

		test.equals( (function(){ return jQuery.makeArray(arguments); })(1,2).join(""), "12", "Pass makeArray an arguments array" );

		test.equals( jQuery.makeArray([1,2,3]).join(""), "123", "Pass makeArray a real array" );

		test.equals( jQuery.makeArray().length, 0, "Pass nothing to makeArray and test.expect an empty array" );

		test.equals( jQuery.makeArray( 0 )[0], 0 , "Pass makeArray a number" );

		test.equals( jQuery.makeArray( "foo" )[0], "foo", "Pass makeArray a string" );

		test.equals( jQuery.makeArray( true )[0].constructor, Boolean, "Pass makeArray a boolean" );

		test.equals( jQuery.makeArray( document.createElement("div") )[0].nodeName.toUpperCase(), "DIV", "Pass makeArray a single node" );

		test.equals( jQuery.makeArray( {length:2, 0:"a", 1:"b"} ).join(""), "ab", "Pass makeArray an array like map (with length)" );

		test.ok( !!jQuery.makeArray( document.documentElement.childNodes ).slice(0,1)[0].nodeName, "Pass makeArray a childNodes array" );

		// function, is tricky as it has length
		test.equals( jQuery.makeArray( function(){ return 1;} )[0](), 1, "Pass makeArray a function" );

		//window, also has length
		test.equals( jQuery.makeArray(window)[0], window, "Pass makeArray the window" );

		test.equals( jQuery.makeArray(/a/)[0].constructor, RegExp, "Pass makeArray a regex" );

		test.equals( jQuery.makeArray(document.getElementById('form')).length, 2, "Pass makeArray a form (treat as elements)" );

		// For #5610
		test.same( jQuery.makeArray({'length': '0'}), [], "Make sure object is coerced properly.");
		test.same( jQuery.makeArray({'length': '5'}), [], "Make sure object is coerced properly.");
		test.done();
	},

	"jQuery.isEmptyObject": function(test){
		test.expect(2);

		test.equals(true, jQuery.isEmptyObject({}), "isEmptyObject on empty object literal" );
		test.equals(false, jQuery.isEmptyObject({a:1}), "isEmptyObject on non-empty object literal" );

		// What about this ?
		// test.equals(true, jQuery.isEmptyObject(null), "isEmptyObject on null" );
		test.done();
	},

	"jQuery.proxy": function(test){
		test.expect(4);

		var testfn = function(){ test.equals( this, thisObject, "Make sure that scope is set properly." ); };
		var thisObject = { foo: "bar", method: testfn };

		// Make sure normal works
		testfn.call( thisObject );

		// Basic scoping
		jQuery.proxy( testfn, thisObject )();

		// Make sure it doesn't freak out
		test.equals( jQuery.proxy( null, thisObject ), undefined, "Make sure no function was returned." );

		// Use the string shortcut
		jQuery.proxy( thisObject, "method" )();
		test.done();
	},
	"jQuery.parseJSON": function(test){
		test.expect(8);

		test.equals( jQuery.parseJSON(), null, "Nothing in, null out." );
		test.equals( jQuery.parseJSON( null ), null, "Nothing in, null out." );
		test.equals( jQuery.parseJSON( "" ), null, "Nothing in, null out." );

		test.same( jQuery.parseJSON("{}"), {}, "Plain object parsing." );
		test.same( jQuery.parseJSON('{"test":1}'), {"test":1}, "Plain object parsing." );

		test.same( jQuery.parseJSON('\n{"test":1}'), {"test":1}, "Make sure leading whitespaces are handled." );

		try {
			jQuery.parseJSON("{a:1}");
			test.ok( false, "Test malformed JSON string." );
		} catch( e ) {
			test.ok( true, "Test malformed JSON string." );
		}

		try {
			jQuery.parseJSON("{'a':1}");
			test.ok( false, "Test malformed JSON string." );
		} catch( e ) {
			test.ok( true, "Test malformed JSON string." );
		}
		test.done();
	},

	"jQuery.sub() - Static Methods": function(test){
		test.expect(18);
		var Subclass = jQuery.sub();
		Subclass.extend({
			topLevelMethod: function() {return this.debug;},
			debug: false,
			config: {
				locale: 'en_US'
			},
			setup: function(config) {
				this.extend(true, this.config, config);
			}
		});
		Subclass.fn.extend({subClassMethod: function() { return this;}});

		//Test Simple Subclass
		test.ok(Subclass.topLevelMethod() === false, 'Subclass.topLevelMethod thought debug was true');
		test.ok(Subclass.config.locale == 'en_US', Subclass.config.locale + ' is wrong!');
		test.same(Subclass.config.test, undefined, 'Subclass.config.test is set incorrectly');
		test.equal(jQuery.ajax, Subclass.ajax, 'The subclass failed to get all top level methods');

		//Create a SubSubclass
		var SubSubclass = Subclass.sub();

		//Make Sure the SubSubclass inherited properly
		test.ok(SubSubclass.topLevelMethod() === false, 'SubSubclass.topLevelMethod thought debug was true');
		test.ok(SubSubclass.config.locale == 'en_US', SubSubclass.config.locale + ' is wrong!');
		test.same(SubSubclass.config.test, undefined, 'SubSubclass.config.test is set incorrectly');
		test.equal(jQuery.ajax, SubSubclass.ajax, 'The subsubclass failed to get all top level methods');

		//Modify The Subclass and test the Modifications
		SubSubclass.fn.extend({subSubClassMethod: function() { return this;}});
		SubSubclass.setup({locale: 'es_MX', test: 'worked'});
		SubSubclass.debug = true;
		SubSubclass.ajax = function() {return false;};
		test.ok(SubSubclass.topLevelMethod(), 'SubSubclass.topLevelMethod thought debug was false');
		test.same(SubSubclass(document).subClassMethod, Subclass.fn.subClassMethod, 'Methods Differ!');
		test.ok(SubSubclass.config.locale == 'es_MX', SubSubclass.config.locale + ' is wrong!');
		test.ok(SubSubclass.config.test == 'worked', 'SubSubclass.config.test is set incorrectly');
		test.notEqual(jQuery.ajax, SubSubclass.ajax, 'The subsubclass failed to get all top level methods');

		//This shows that the modifications to the SubSubClass did not bubble back up to it's superclass
		test.ok(Subclass.topLevelMethod() === false, 'Subclass.topLevelMethod thought debug was true');
		test.ok(Subclass.config.locale == 'en_US', Subclass.config.locale + ' is wrong!');
		test.same(Subclass.config.test, undefined, 'Subclass.config.test is set incorrectly');
		test.same(Subclass(document).subSubClassMethod, undefined, 'subSubClassMethod set incorrectly');
		test.equal(jQuery.ajax, Subclass.ajax, 'The subclass failed to get all top level methods');
		test.done();
	},

	"jQuery.sub() - .fn Methods": function(test){
		test.expect(378);

		var Subclass = jQuery.sub(),
		SubclassSubclass = Subclass.sub(),
		jQueryDocument = jQuery(document),
		selectors, contexts, methods, method, arg, description;

		jQueryDocument.toString = function(){ return 'jQueryDocument'; };

		Subclass.fn.subclassMethod = function(){};
		SubclassSubclass.fn.subclassSubclassMethod = function(){};

		selectors = [
			'body',
			'html, body',
			'<div></div>'
		];

		methods = [ // all methods that return a new jQuery instance
			['eq', 1],
			['add', document],
			['end'],
			['has'],
			['closest', 'div'],
			['filter', document],
			['find', 'div']
		];

		contexts = [undefined, document, jQueryDocument];

		jQuery.each(selectors, function(i, selector){

			jQuery.each(methods, function(){
				method = this[0];
				arg = this[1];

				jQuery.each(contexts, function(i, context){

					description = '("'+selector+'", '+context+').'+method+'('+(arg||'')+')';

					test.same(
						jQuery(selector, context)[method](arg).subclassMethod, undefined,
						'jQuery'+description+' doesnt have Subclass methods'
					);
					test.same(
						jQuery(selector, context)[method](arg).subclassSubclassMethod, undefined,
						'jQuery'+description+' doesnt have SubclassSubclass methods'
					);
					test.same(
						Subclass(selector, context)[method](arg).subclassMethod, Subclass.fn.subclassMethod,
						'Subclass'+description+' has Subclass methods'
					);
					test.same(
						Subclass(selector, context)[method](arg).subclassSubclassMethod, undefined,
						'Subclass'+description+' doesnt have SubclassSubclass methods'
					);
					test.same(
						SubclassSubclass(selector, context)[method](arg).subclassMethod, Subclass.fn.subclassMethod,
						'SubclassSubclass'+description+' has Subclass methods'
					);
					test.same(
						SubclassSubclass(selector, context)[method](arg).subclassSubclassMethod, SubclassSubclass.fn.subclassSubclassMethod,
						'SubclassSubclass'+description+' has SubclassSubclass methods'
					);

				});
			});
		});
		test.done();
	}
});

