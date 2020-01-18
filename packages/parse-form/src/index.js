/* globals Seemple */
const $ = require('balajs');
const { select, bindNode } = require('seemple');

function parseForm(object, selector, callback, eventOptions) {
  const form = /:sandbox|:bound/.test(selector) ? select(object, selector) : $.one(selector);
  const fields = $('input, textarea, output, progress, select', form);

  /* istanbul ignore if */
  if (!object || typeof object !== 'object' && typeof object !== 'function') {
    throw new TypeError('parseForm should accept an object or a function as the first argument');
  }

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const { name } = field;

    if (name) {
      bindNode(object, name, field, undefined, eventOptions);
      if (callback) {
        callback(name, field);
      }
    }
  }

  return form;
}

// extend Seemple in browser environment
/* istanbul ignore if */
if (typeof Seemple === 'function') {
  Seemple.parseForm = parseForm;
}

module.exports = parseForm;
