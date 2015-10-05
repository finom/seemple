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

					reader['readAs' + readAs[0].toUpperCase() + readAs.slice(1)](file);
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
		cbInputEvent = document.documentMode == 8 ? 'keyup paste' : 'input';


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
			return {
				on: null,
				getValue: function() {
					return this.dataset[prop];
				},
				setValue: function(v) {
					this.dataset[prop] = v;
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
					if (this.value != v) {
						this.value = v;
					}
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
		visibility: function(value) {
			value = typeof value == 'undefined' ? true : value;

			return {
				on: null,
				getValue: null,
				setValue: function(v) {
					this.style.display = value ? (v ? '' : 'none') : (v ? 'none' : '');
				}
			};
		},
		file: function(readAs) {
			if (typeof FileList != 'undefined') {
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
			} else {
				throw Error('file binder is not supported at this browser');
			}
		},
		style: function(property) {
			return {
				getValue: function() { // @IE8
					return window.getComputedStyle ? getComputedStyle(this, null)
						.getPropertyValue(property) : this.currentStyle[property];
				},
				setValue: function(v) {
					this.style[property] = v;
				}
			};
		}
	};

	binders.html = binders.innerHTML;
	binders.text = binders.innerText;
	binders.prop = binders.property;
	binders.attr = binders.attribute;

	return binders;
});
