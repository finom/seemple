define([
	'matreshka_dir/core/var/core'
], function(core) {
	"use strict";
	var readFiles = function(files, readAs, callback) {
			var length = files.length,
				i = 0,
				filesArray = core.toArray(files),
				file;

			if (readAs) {
				filesArray.forEach(function(file) {
					var reader = new FileReader();

					reader.onloadend = function(evt) {
						file.readerResult = reader.result;
						if (++i == length) {
							callback(filesArray);
						}
					};

					reader[readAs](file);
				});
			} else {
				callback(filesArray);
			}
		},
		getReadAs = function(readAs) {
			/* istanbul ignore if  */
			if (typeof FileReader == 'undefined') {
				throw Error('FileReader is not supported by this browser');
			}

			if (readAs) {
				readAs = 'readAs' + readAs[0].toUpperCase() + readAs.slice(1);
				if (!FileReader.prototype[readAs]) {
					throw Error(readAs + ' is not supported by FileReader');
				}
			}

			return readAs;
		},
		binders;

	core.binders = binders = {
		innerHTML: function() {
			return {
				on: 'input',
				getValue: function() {
					return this.innerHTML;
				},
				setValue: function(v) {
					this.innerHTML = v + '';
				}
			};
		},
		innerText: function() {
			return {
				on: 'input',
				getValue: function() {
					return this.textContent;
				},
				setValue: function(v) {
					this.textContent = v + '';
				}
			};
		},
		className: function(className) {
			var not = className.indexOf('!') === 0;

			if (not) {
				className = className.replace('!', '');
			}

			return {
				on: null,
				getValue: function() {
					var _this = this,
						contains = _this.classList ? _this.classList.contains(className) : hasClass(_this, className);

					return not ? !contains : !!contains;
				},
				setValue: function(v) {
					var _this = this,
						add = not ? !v : !!v;

					_this.classList ? _this.classList[add ? 'add' : 'remove'](className) : add ? addClass(_this, className) : removeClass(_this, className);
				}
			};

			// @IE9
			// thanks to Iliya Kantor
			function addClass(o, c) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
				if (re.test(o.className)) return;
				o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
			}

			function removeClass(o, c) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
				o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
			}

			function hasClass(o, c) {
				return new RegExp('(\\s|^)' + c + '(\\s|$)').test(o.className);
			}
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
					if (_this.dataset) {
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
							this.checked = typeof v != 'undefined' && this.value == v;
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

					/*
				case 'text':
				case 'password':
				case 'date':
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
			return {
				on: null,
				getValue: function() {
					var _this = this;
					return _this.value || _this.textContent;
				},
				setValue: function(v) {
					var _this = this;
					_this['form' in _this ? 'value' : 'textContent'] = v === null ? '' : v + '';
				}
			};
		},
		select: function(multiple) {
			var i;
			if (multiple) {
				return {
					on: 'change',
					getValue: function() {
						var i = 0,
							options = this.options,
							result = [];

						for (; options.length > i; i++) {
							if (options[i].selected) {
								result.push(options[i].value);
							}
						}

						return result;
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
		style: function(property) {
			return {
				on: null,
				getValue: function() {
					var _this = this;
					return _this.style[property] || getComputedStyle(_this, null).getPropertyValue(property);
				},
				setValue: function(v) {
					this.style[property] = v;
				}
			};
		},
		file: function(readAs) {
			readAs = getReadAs(readAs);

			return {
				on: function(callback) {
					this.addEventListener('change', function() {
						var files = this.files;
						if (files.length) {
							readFiles(files, readAs, callback);
						} else {
							callback([]);
						}
					});
				},
				getValue: function(evt) {
					var files = evt.domEvent || [];
					return this.multiple ? files : files[0] || null;
				},
				setValue: null
			};
		},
		dropFiles: function(readAs) {
			readAs = getReadAs(readAs);

			return {
				on: function(callback) {
					this.addEventListener('drop', function(evt) {
						evt.preventDefault();
						var files = evt.dataTransfer.files;
						if (files.length) {
							readFiles(files, readAs, callback);
						} else {
							callback([]);
						}
					});

					this.addEventListener('dragover', function(evt) {
						evt.preventDefault();
						evt.dataTransfer.dropEffect = 'copy';
					});
				},
				getValue: function(o) {
					return o.domEvent || [];
				},
				setValue: null
			};
		},
		dragOver: function() {
			return {
				on: 'dragover dragenter dragleave dragend drop',
				getValue: function(evt) {
					var eventType = evt.domEvent && evt.domEvent.type;
					return eventType == 'dragover' || eventType == 'dragenter';
				},
				setValue: null
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
