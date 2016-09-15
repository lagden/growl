(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Growl = factory());
}(this, (function () { 'use strict';

function detect(lista) {
	for (var i = 0; i < lista.length; i++) {
		if (document.documentElement.style[lista[i][0]] !== undefined) {
			return lista[i];
		}
	}
	return lista[0];
}

function extend(a, b) {
	Object.keys(b).forEach(function (prop) {
		a[prop] = b[prop];
	});
	return a;
}

function transitionEvent() {
	var VENDOR = [
		['transition', 'transitionend'],
		['MozTransition', 'mozTransitionEnd'],
		['OTransition', 'oTransitionEnd'],
		['webkitTransition', 'webkitTransitionEnd']
	];
	return detect(VENDOR)[1];
}

var transitionEnd = transitionEvent();

var Growl = function Growl(opts) {
	if ( opts === void 0 ) opts = {};

	this.opts = {
		duration: 7000,
		offset: 10,
		position: 'right'
	};

	this.options = opts;

	this.items = [];
	this.container = document.body;
};

var prototypeAccessors = { options: {} };

prototypeAccessors.options.set = function (opts) {
		if ( opts === void 0 ) opts = {};

	extend(this.opts, opts);
};

Growl.prototype.template = function template (dados) {
	var title = dados.title;
		var msg = dados.msg;
	return [
		("<h3 class=\"growl__title\">" + title + "</h3>"),
		("<p class=\"growl__msg\">" + msg + "</p>")
	].join('');
};

Growl.prototype.notifica = function notifica (t, m, colorCss) {
		var this$1 = this;
		if ( colorCss === void 0 ) colorCss = false;

	var offset = [this.opts.offset, this.opts.offset];
	var r = {
		title: t,
		msg: m
	};

	var last = this.items[this.items.length - 1] || false;
	if (last) {
		offset[0] = Number(last.getAttribute('data-offset'));
		offset[1] = offset[0] + last.offsetHeight + this.opts.offset;
	}

	var item = document.createElement('div');
	item.addEventListener('click', this, false);
	item.insertAdjacentHTML('afterbegin', this.template(r));
	item.style.top = (offset[1]) + "px";
		item.style[this.opts.position || 'right'] = (this.opts.offset) + "px";
	item.setAttribute('data-offset', offset[1]);
	item.classList.add('growl');
	if (typeof colorCss === 'string') {
		item.classList.add(colorCss);
	}

	var docfrag = document.createDocumentFragment();
	docfrag.appendChild(item);

	this.items.push(item);
	this.container.appendChild(docfrag);

	// Make sure the initial state is applied.
	window.getComputedStyle(item).getPropertyValue('opacity');
	item.classList.add('growl--show');

	item.tempo = setTimeout(function () {
		this$1.animation(null, item);
	}, this.opts.duration);
};

Growl.prototype.animation = function animation (event, item) {
	if (event) {
		item = event.currentTarget;
	}
	clearTimeout(item.tempo);
	item.tempo = null;
	item.addEventListener(transitionEnd, this, false);
	item.classList.add('growl--remove');
};

Growl.prototype.remove = function remove (event, item) {
	if (event) {
		item = event.currentTarget;
	}
	item.removeEventListener('click', this, false);
	item.removeEventListener(transitionEnd, this, false);
	var index = this.items.indexOf(item);
	if (index !== -1) {
		this.container.removeChild(this.items[index]);
		this.items[index] = null;
		this.items.splice(index, 1);
	}
};

Growl.prototype.handleEvent = function handleEvent (event) {
	switch (event.type) {
		case transitionEnd:
			this.remove(event);
			break;
		case 'click':
			this.animation(event);
			break;
		default:
	}
};

Object.defineProperties( Growl.prototype, prototypeAccessors );

return Growl;

})));
//# sourceMappingURL=growl.js.map
