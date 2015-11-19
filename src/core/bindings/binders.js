define([
	'matreshka_dir/core/var/core'
], function(core) {
	"use strict";
	var readFiles = function(files, readAs, callback) {
			var length = files.length,
				j = 0,
				i = 0,
				filesArray = [],
				reader,
				file;

			for (; i < length; i++) {
				file = files[i];

				if (readAs) {
					reader = new FileReader();
					reader.onloadend = function(evt) {
						file.readerResult = reader.result;
						filesArray[j++] = file;
						if (j == length) {
							callback(filesArray);
						}
					};

					reader[readAs](file);
				} else {
					filesArray[j++] = file;
					if (j == length) {
						callback(filesArray);
					}
				}
			}

		},
		binders,
		// cross-browser input event
		cbInputEvent = typeof document != 'undefined' && document.documentMode == 8 ? 'keyup paste' : 'input';

	core.binders = binders = {
		innerHTML: function() { // @IE8
			return {
				on: cbInputEvent,
				getValue: function() {
					return this.innerHTML;
				},
				setValue: function(v) {
					this.innerHTML = v === null ? '' : v + '';
				}
			};
		},
		innerText: function() { // @IE8
			return {
				on: cbInputEvent,
				getValue: function() {
					return this.textContent || this.innerText;
				},
				setValue: function(v) {
					this['textContent' in this ? 'textContent' : 'innerText'] = v === null ? '' : v + '';
				}
			};
		},
		className: function(className) {
			var not = className.indexOf('!') === 0,
				contains;

			if (not) {
				className = className.replace('!', '');
			}

			return {
				on: null,
				getValue: function() {
					contains = this.classList.contains(className);
					return not ? !contains : !!contains;
				},
				setValue: function(v) {
					this.classList.toggle(className, not ? !v : !!v);
				}
			};
		},
		property: function(propertyName) {
			return {
				on: null,
				getValue: function() {
					return this[propertyName];
				},
				setValue: function(v) {
					// in case when you're trying to set read-only property
					try {
						this[propertyName] = v;
					} catch (e) {}
				}
			};
		},
		attribute: function(attributeName) {
			return {
				on: null,
				getValue: function() {
					return this.getAttribute(attributeName);
				},
				setValue: function(v) {
					this.setAttribute(attributeName, v);
				}
			};
		},
		dataset: function(prop) {
			// replace namesLikeThis with names-like-this
			function toDashed(name) {
				return 'data-' + name.replace(/([A-Z])/g, function(u) {
					return "-" + u.toLowerCase();
				});
			}

			return {
				on: null,
				getValue: function() {
					var _this = this;
					return _this.dataset ? _this.dataset[prop] : _this.getAttribute(toDashed(prop));
				},
				setValue: function(v) {
					var _this = this;
					if(_this.dataset) {
						_this.dataset[prop] = v;
					} else {
						_this.setAttribute(toDashed(prop), v);
					}
				}
			};
		},
		textarea: function() {
			return binders.input('text');
		},
		progress: function() {
			return binders.input();
		},
		input: function(type, options) {
			var on;
			switch (type) {
				case 'checkbox':
					return {
						on: 'click keyup',
						getValue: function() {
							return this.checked;
						},
						setValue: function(v) {
							this.checked = v;
						}
					};
				case 'radio':
					return {
						on: 'click keyup',
						getValue: function() {
							return this.value;
						},
						setValue: function(v) {
							this.checked = this.value == v;
						}
					};
				case 'submit':
				case 'button':
				case 'image':
				case 'reset':
					return {};
				case 'hidden':
					on = null;
					break;
				case 'file':
					on = 'change';
					break;
				case 'text':
				case 'password':
					// IE8 requires to use 'keyup paste' instead of 'input'
					on = cbInputEvent;
					break;
					/*  case 'date':
				case 'datetime':
				case 'datetime-local':
				case 'month':
				case 'time':
				case 'week':
				case 'range':
				case 'color':
				case 'search':
				case 'email':
				case 'tel':
				case 'url':
                case 'file':
				case 'number':  */
				default: // other future (HTML6+) inputs
					on = 'input';
			}

			return {
				on: on,
				getValue: function() {
					return this.value;
				},
				setValue: function(v) {
					this.value = v;
				}
			};
		},
		output: function() {
			// @IE8
			return {
				getValue: function() {
					var _this = this;
					return _this.value || _this.textContent || _this.innerText;
				},
				setValue: function(v) {
					var _this = this;
					_this['form' in _this ? 'value' : ('textContent' in _this ? 'textContent' : 'innerText')]
						= v === null ? '' : v + '';
				}
			};
		},
		select: function(multiple) {
			var i;
			if (multiple) {
				return {
					on: 'change',
					getValue: function() {
						return [].slice.call(this.options)
							.filter(function(o) {
								return o.selected;
							})
							.map(function(o) {
								return o.value;
							});
					},
					setValue: function(v) {
						v = typeof v == 'string' ? [v] : v;
						for (i = this.options.length - 1; i >= 0; i--) {
							this.options[i].selected = ~v.indexOf(this.options[i].value);
						}
					}
				};
			} else {
				return {
					on: 'change',
					getValue: function() {
						return this.value;
					},
					setValue: function(v) {
						var _this = this,
							options;

						_this.value = v;

						if (!v) {
							options = _this.options;
							for (i = options.length - 1; i >= 0; i--) {
								if (!options[i].value) {
									options[i].selected = true;
								}
							}
						}
					}
				};
			}
		},
		display: function(value) {
			value = typeof value == 'undefined' ? true : value;

			return {
				on: null,
				getValue: function() {
					var _this = this,
						v = _this.style.display || (window.getComputedStyle ? getComputedStyle(_this, null)
							.getPropertyValue('display') : _this.currentStyle.display),
						none = v == 'none';

					return value ? !none : !!none;
				},
				setValue: function(v) {
					this.style.display = value ? (v ? '' : 'none') : (v ? 'none' : '');
				}
			};
		},
		file: function(readAs) {
			if (typeof FileReader == 'undefined') {
				throw Error('FileReader is not supported by this browser');
			}

			if(readAs) {
				readAs = 'readAs' + readAs[0].toUpperCase() + readAs.slice(1);
				if(!FileReader.prototype[readAs]) {
					throw Error(readAs + ' is not supported by FileReader');
				}
			}

			return {
				on: function(callback) {
					var handler = function() {
						var files = this.files;
						if (files.length) {
							readFiles(files, readAs, function(files) {
								callback(files);
							});
						} else {
							callback([]);
						}
					};

					this.addEventListener('change', handler);
				},
				getValue: function(evt) {
					var files = evt.domEvent || [];
					return this.multiple ? files : files[0] || null;
				}
			};
		},
		style: function(property) {
			return {
				getValue: function() { // @IE8
					var _this = this;
					return _this.style[property] || (window.getComputedStyle ? getComputedStyle(_this, null)
						.getPropertyValue(property) : _this.currentStyle[property]);
				},
				setValue: function(v) {
					this.style[property] = v;
				}
			};
		}
	};

	binders.visibility = binders.display;
	binders.html = binders.innerHTML;
	binders.text = binders.innerText;
	binders.prop = binders.property;
	binders.attr = binders.attribute;

	return binders;
});
