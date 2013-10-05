var testCase = require('nodeunit').testCase,
static_document = require('fs').readFileSync('test/fixtures/css.html', 'utf8');

// need to be global as helpers access these variables
window = document = jQuery = $ = null;

var helpers = require('./helpers/helper'),
q = helpers.query_ids;

module.exports = testCase({
	setUp: function (callback) {
		jQuery = $ = helpers.recreate_doc(static_document);
		callback();
	},
	tearDown: function (callback) {
		// clean up
		callback();
	},
	"css(String|Hash)": function(test) {
		test.expect(18);

		//test.equals( jQuery('#main').css("display"), 'block', 'Check for css property "display"');

		test.ok( jQuery('#nothiddendiv').is(':visible'), 'Modifying CSS display: Assert element is visible');
		jQuery('#nothiddendiv').css({display: 'none'});
		test.ok( !jQuery('#nothiddendiv').is(':visible'), 'Modified CSS display: Assert element is hidden');
		jQuery('#nothiddendiv').css({display: 'block'});
		test.ok( jQuery('#nothiddendiv').is(':visible'), 'Modified CSS display: Assert element is visible');

		var div = jQuery( "<div>" );

		// These should be "auto" (or some better value)
		// temporarily provide "0px" for backwards compat
		test.equals( div.css("width"), "0px", "Width on disconnected node." );
		test.equals( div.css("height"), "0px", "Height on disconnected node." );

		div.css({ width: 4, height: 4 });

		test.equals( div.css("width"), "4px", "Width on disconnected node." );
		test.equals( div.css("height"), "4px", "Height on disconnected node." );

		var div2 = jQuery( "<div style='display:none;'><input type='text' style='height:20px;'/><textarea style='height:20px;'/><div style='height:20px;'></div></div>").appendTo("body");

		test.equals( div2.find("input").css("height"), "20px", "Height on hidden input." );
		test.equals( div2.find("textarea").css("height"), "20px", "Height on hidden textarea." );
		test.equals( div2.find("div").css("height"), "20px", "Height on hidden textarea." );

		div2.remove();

		// handle negative numbers by ignoring #1599, #4216
		jQuery('#nothiddendiv').css({ 'width': 1, 'height': 1 });

		var width = parseFloat(jQuery('#nothiddendiv').css('width')), height = parseFloat(jQuery('#nothiddendiv').css('height'));
		jQuery('#nothiddendiv').css({ width: -1, height: -1 });
		//test.equals( parseFloat(jQuery('#nothiddendiv').css('width')), width, 'Test negative width ignored')
		//test.equals( parseFloat(jQuery('#nothiddendiv').css('height')), height, 'Test negative height ignored')

		test.equals( jQuery('<div style="display: none;">').css('display'), 'none', 'Styles on disconnected nodes');

		//jQuery('#floatTest').css('float', 'right');
		//test.equals( jQuery('#floatTest').css('float'), 'right', 'Modified CSS float using "float": Assert float is right');
		//jQuery('#floatTest').css({'font-size': '30px'});
		//test.equals( jQuery('#floatTest').css('font-size'), '30px', 'Modified CSS font-size: Assert font-size is 30px');

		/*jQuery.each("0,0.25,0.5,0.75,1".split(','), function(i, n) {
			jQuery('#foo').css({opacity: n});
			test.equals( jQuery('#foo').css('opacity'), parseFloat(n), "Assert opacity is " + parseFloat(n) + " as a String" );
			jQuery('#foo').css({opacity: parseFloat(n)});
			test.equals( jQuery('#foo').css('opacity'), parseFloat(n), "Assert opacity is " + parseFloat(n) + " as a Number" );
		});*/
		jQuery('#foo').css({opacity: ''});
		test.equals( jQuery('#foo').css('opacity'), '1', "Assert opacity is 1 when set to an empty String" );

		//test.equals( jQuery('#empty').css('opacity'), '0', "Assert opacity is accessible via filter property set in stylesheet in IE" );
		//jQuery('#empty').css({ opacity: '1' });
		//test.equals( jQuery('#empty').css('opacity'), '1', "Assert opacity is taken from style attribute when set vs stylesheet in IE with filters" );

		var div = jQuery('#nothiddendiv'), child = jQuery('#nothiddendivchild');

		//test.equals( parseInt(div.css("fontSize")), 16, "Verify fontSize px set." );
		//test.equals( parseInt(div.css("font-size")), 16, "Verify fontSize px set." );
		//test.equals( parseInt(child.css("fontSize")), 16, "Verify fontSize px set." );
		//test.equals( parseInt(child.css("font-size")), 16, "Verify fontSize px set." );

		child.css("height", "100%");
		test.equals( child[0].style.height, "100%", "Make sure the height is being set correctly." );

		child.attr("class", "em");
		//test.equals( parseInt(child.css("fontSize")), 32, "Verify fontSize em set." );

		// Have to verify this as the result depends upon the browser's CSS
		// support for font-size percentages
		child.attr("class", "prct");
		var prctval = parseInt(child.css("fontSize")), checkval = 0;
		if ( prctval === 16 || prctval === 24 ) {
			checkval = prctval;
		}

		//test.equals( prctval, checkval, "Verify fontSize % set." );

		test.equals( typeof child.css("width"), "string", "Make sure that a string width is returned from css('width')." );

		var old = child[0].style.height;

		// Test NaN
		child.css("height", parseFloat("zoo"));
		test.equals( child[0].style.height, old, "Make sure height isn't changed on NaN." );

		// Test null
		child.css("height", null);
		test.equals( child[0].style.height, old, "Make sure height isn't changed on null." );

		old = child[0].style.fontSize;

		// Test NaN
		child.css("font-size", parseFloat("zoo"));
		test.equals( child[0].style.fontSize, old, "Make sure font-size isn't changed on NaN." );

		// Test null
		child.css("font-size", null);
		test.equals( child[0].style.fontSize, old, "Make sure font-size isn't changed on null." );
		test.done();
	}	
});
