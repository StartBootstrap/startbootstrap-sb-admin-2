//https://github.com/inexorabletash/polyfill/blob/master/web.js
  if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];

      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);

      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }

  if (!document.querySelector) {
    document.querySelector = function (selectors) {
      var elements = document.querySelectorAll(selectors);
      return (elements.length) ? elements[0] : null;
    };
  }

  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (classNames) {
      classNames = String(classNames).replace(/^|\s+/g, '.');
      return document.querySelectorAll(classNames);
    };
  }

//https://github.com/inexorabletash/polyfill
// ES5 15.2.3.14 Object.keys ( O )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = function (o) {
    if (o !== Object(o)) { throw TypeError('Object.keys called on non-object'); }
    var ret = [], p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        ret.push(p);
      }
    }
    return ret;
  };
}

//https://github.com/inexorabletash/polyfill/blob/master/web.js
(function (global) {
  var B64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  global.atob = global.atob || function (input) {
    input = String(input);
    var position = 0,
        output = [],
        buffer = 0, bits = 0, n;

    input = input.replace(/\s/g, '');
    if ((input.length % 4) === 0) { input = input.replace(/=+$/, ''); }
    if ((input.length % 4) === 1) { throw Error("InvalidCharacterError"); }
    if (/[^+/0-9A-Za-z]/.test(input)) { throw Error("InvalidCharacterError"); }

    while (position < input.length) {
      n = B64_ALPHABET.indexOf(input.charAt(position));
      buffer = (buffer << 6) | n;
      bits += 6;

      if (bits === 24) {
        output.push(String.fromCharCode((buffer >> 16) & 0xFF));
        output.push(String.fromCharCode((buffer >>  8) & 0xFF));
        output.push(String.fromCharCode(buffer & 0xFF));
        bits = 0;
        buffer = 0;
      }
      position += 1;
    }

    if (bits === 12) {
      buffer = buffer >> 4;
      output.push(String.fromCharCode(buffer & 0xFF));
    } else if (bits === 18) {
      buffer = buffer >> 2;
      output.push(String.fromCharCode((buffer >> 8) & 0xFF));
      output.push(String.fromCharCode(buffer & 0xFF));
    }

    return output.join('');
  };

  global.btoa = global.btoa || function (input) {
    input = String(input);
    var position = 0,
        out = [],
        o1, o2, o3,
        e1, e2, e3, e4;

    if (/[^\x00-\xFF]/.test(input)) { throw Error("InvalidCharacterError"); }

    while (position < input.length) {
      o1 = input.charCodeAt(position++);
      o2 = input.charCodeAt(position++);
      o3 = input.charCodeAt(position++);

      // 111111 112222 222233 333333
      e1 = o1 >> 2;
      e2 = ((o1 & 0x3) << 4) | (o2 >> 4);
      e3 = ((o2 & 0xf) << 2) | (o3 >> 6);
      e4 = o3 & 0x3f;

      if (position === input.length + 2) {
        e3 = 64; e4 = 64;
      }
      else if (position === input.length + 1) {
        e4 = 64;
      }

      out.push(B64_ALPHABET.charAt(e1),
               B64_ALPHABET.charAt(e2),
               B64_ALPHABET.charAt(e3),
               B64_ALPHABET.charAt(e4));
    }

    return out.join('');
  };
}(this));

//https://github.com/jonathantneal/polyfill/blob/master/source/Window.prototype.getComputedStyle.ie8.js
(function () {
	if(window.getComputedStyle) return; //Add an exit if already defined
	function getComputedStylePixel(element, property, fontSize) {
		element.document; // Internet Explorer sometimes struggles to read currentStyle until the element's document is accessed.

		var
		value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
		size = value[1],
		suffix = value[2],
		rootSize;

		fontSize = !fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
		rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

		return suffix == '%' ? size / 100 * rootSize :
		       suffix == 'cm' ? size * 0.3937 * 96 :
		       suffix == 'em' ? size * fontSize :
		       suffix == 'in' ? size * 96 :
		       suffix == 'mm' ? size * 0.3937 * 96 / 10 :
		       suffix == 'pc' ? size * 12 * 96 / 72 :
		       suffix == 'pt' ? size * 96 / 72 :
		       size;
	}

	function setShortStyleProperty(style, property) {
		var
		borderSuffix = property == 'border' ? 'Width' : '',
		t = property + 'Top' + borderSuffix,
		r = property + 'Right' + borderSuffix,
		b = property + 'Bottom' + borderSuffix,
		l = property + 'Left' + borderSuffix;

		style[property] = (style[t] == style[r] && style[t] == style[b] && style[t] == style[l] ? [ style[t] ] :
		                   style[t] == style[b] && style[l] == style[r] ? [ style[t], style[r] ] :
		                   style[l] == style[r] ? [ style[t], style[r], style[b] ] :
		                   [ style[t], style[r], style[b], style[l] ]).join(' ');
	}

	// <CSSStyleDeclaration>
	function CSSStyleDeclaration(element) {
		var
		style = this,
		currentStyle = element.currentStyle,
		fontSize = getComputedStylePixel(element, 'fontSize'),
		unCamelCase = function (match) {
			return '-' + match.toLowerCase();
		},
		property;

		for (property in currentStyle) {
			Array.prototype.push.call(style, property == 'styleFloat' ? 'float' : property.replace(/[A-Z]/, unCamelCase));
			if (property == 'width') {
				style[property] = element.offsetWidth + 'px';
			} else if (property == 'height') {
				style[property] = element.offsetHeight + 'px';
			} else if (property == 'styleFloat') {
				style.float = currentStyle[property];
			} else if (/margin.|padding.|border.+W/.test(property) && style[property] != 'auto') {
				style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
			} else if (/^outline/.test(property)) {
				// errors on checking outline
				try {
					style[property] = currentStyle[property];
				} catch (error) {
					style.outlineColor = currentStyle.color;
					style.outlineStyle = style.outlineStyle || 'none';
					style.outlineWidth = style.outlineWidth || '0px';
					style.outline = [style.outlineColor, style.outlineWidth, style.outlineStyle].join(' ');
				}
			} else {
				style[property] = currentStyle[property];
			}
		}

		setShortStyleProperty(style, 'margin');
		setShortStyleProperty(style, 'padding');
		setShortStyleProperty(style, 'border');

		style.fontSize = Math.round(fontSize) + 'px';
	}

	CSSStyleDeclaration.prototype = {
		constructor: CSSStyleDeclaration,
		// <CSSStyleDeclaration>.getPropertyPriority
		getPropertyPriority: function () {
			throw new Error('NotSupportedError: DOM Exception 9');
		},
		// <CSSStyleDeclaration>.getPropertyValue
		getPropertyValue: function(property) {
		    var lookup = property.replace(/-([a-z])/g, function(match) {
		        match = match.charAt ? match.split('') : match;
		        return match[1].toUpperCase();
		    });
		    var ret = this[lookup];
		    return ret;
		},
		// <CSSStyleDeclaration>.item
		item: function (index) {
			return this[index];
		},
		// <CSSStyleDeclaration>.removeProperty
		removeProperty: function () {
			throw new Error('NoModificationAllowedError: DOM Exception 7');
		},
		// <CSSStyleDeclaration>.setProperty
		setProperty: function () {
			throw new Error('NoModificationAllowedError: DOM Exception 7');
		},
		// <CSSStyleDeclaration>.getPropertyCSSValue
		getPropertyCSSValue: function () {
			throw new Error('NotSupportedError: DOM Exception 9');
		}
	};

	// <window>.getComputedStyle
	window.getComputedStyle = function (element) {
		return new CSSStyleDeclaration(element);
	};
})();

//https://gist.github.com/jimeh/332357
if (!Object.prototype.hasOwnProperty){
    /*jshint -W001, -W103 */
    Object.prototype.hasOwnProperty = function(prop) {
		var proto = this.__proto__ || this.constructor.prototype;
		return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
	}
    /*jshint +W001, +W103 */
}
