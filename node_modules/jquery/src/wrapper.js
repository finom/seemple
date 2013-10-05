(function () {
function create(window) {

  if(window == null ) {
    window = require('jsdom').jsdom().createWindow();
    // assume window is a jsdom instance...
    // jsdom includes an incomplete version of XMLHttpRequest
    window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    // trick jQuery into thinking CORS is supported (should be in node-XMLHttpRequest)
    window.XMLHttpRequest.prototype.withCredentials = false;
    
    if(window.location == null) {
      window.location = require('location');  
    }

    if(window.navigator == null) {
      window.navigator = require('navigator');
    }
  }
  

  var location = window.location,
      navigator = window.navigator,
      XMLHttpRequest = window.XMLHttpRequest;

  //JQUERY_SOURCE

  window.jQuery.noConflict();
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());
