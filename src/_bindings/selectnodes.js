export default function selectNodes(object, selectors) {
	
	var objectData = map.get(object),
		$ = core.$,
		result = $(),
		execResult,
		$bound,
		node,
		selector,
		i, j,
		random,
		subSelector,
		key,
		selected;

	if (!object || typeof object != 'object' || !objectData) return result;

	// replacing :sandbox to :bound(sandbox)
	selectors = selectors.split(',');

	for (i = 0; i < selectors.length; i++) {
		selector = selectors[i];

		if (execResult = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/.exec(selector)) {
			key = execResult[3] !== undefined ? 'sandbox' : execResult[1];
			subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];

			// getting KEY from :bound(KEY)
			$bound = objectData.special[key] && objectData.special[key].$nodes;
			if(!$bound || !$bound.length) {
				continue;
			}

			// if native selector passed after :bound(KEY) is not empty string
			// for example ":bound(KEY) .my-selector"
			if (subSelector) {
				// if native selector contains children selector
				// for example ":bound(KEY) > .my-selector"
				if (subSelector.indexOf('>') === 0) {
					// selecting children
					for (j = 0; j < $bound.length; j++) {
						node = $bound[j];
						random = 'm' + core.randomString();
						node.setAttribute(random, random);
						selected = node.querySelectorAll('[' + random + '="' + random + '"]' + subSelector);
						result = result.add(util.toArray(selected));
						node.removeAttribute(random);
					}

				} else {
					// if native selector doesn't contain children selector
					result = result.add($bound.find(subSelector));
				}
			} else {
				// if native selector is empty string
				result = result.add($bound);
			}
			// if it's native selector
		} else {
			result = result.add(selector);
		}
	}


	return result;
}
