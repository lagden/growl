(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'lagden-utils/dist/index'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('lagden-utils/dist/index'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.lagdenUtils);
		global.growl = mod.exports;
	}
})(this, function (exports, module, _lagdenUtilsDistIndex) {
	/* Growl
  * Plugin to show notification like Growl
  * http://lagden.github.io/growl
  * MIT license
  */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var transitionEnd = _lagdenUtilsDistIndex.transitionEvent();

	var instance = null;

	if ('assign' in Object === false) {
		Object.assign = _lagdenUtilsDistIndex.extend;
	}

	var Growl = (function () {
		function Growl() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, Growl);

			this.opts = {
				target: document.body,
				duration: 7000,
				offset: 10
			};
			Object.assign(this.opts, options);
			this.items = [];
			this.container = this.opts.target;
		}

		_createClass(Growl, [{
			key: 'template',
			value: function template() {
				return ['<h3 class="theNotification__title">{title}</h3>', '<p class="theNotification__msg">{msg}</p>'].join('');
			}
		}, {
			key: 'notifica',
			value: function notifica(t, m) {
				var _this = this;

				var colorCss = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

				var offset = [this.opts.offset, this.opts.offset];
				var r = {
					title: t,
					msg: m
				};

				var last = this.items[this.items.length - 1] || false;
				if (last) {
					offset[0] = Number(last.dataset.offset);
					offset[1] = offset[0] + last.offsetHeight + this.opts.offset;
				}

				var content = this.template().replace(/\{(.*?)\}/g, function (a, b) {
					return r[b];
				});

				var item = document.createElement('div');
				item.insertAdjacentHTML('afterbegin', content);
				item.addEventListener('click', this, false);
				item.style.top = offset[1] + 'px';
				item.style.right = this.opts.offset + 'px';
				item.dataset.offset = offset[1];
				item.classList.add('theNotification');
				if (typeof colorCss === 'string') {
					item.classList.add(colorCss);
				}

				var docfrag = document.createDocumentFragment();
				docfrag.appendChild(item);

				this.items.push(item);
				this.container.appendChild(docfrag);

				// Make sure the initial state is applied.
				window.getComputedStyle(item).getPropertyValue('opacity');
				item.classList.add('theNotification--show');

				var tempo = setTimeout(function () {
					_this.animation(null, item);
					clearTimeout(tempo);
				}, this.opts.duration);
			}
		}, {
			key: 'animation',
			value: function animation(event, item) {
				if (event) {
					item = event.currentTarget;
				}
				item.addEventListener(transitionEnd, this, false);
				item.classList.add('theNotification--remove');
			}
		}, {
			key: 'remove',
			value: function remove(event) {
				var item = event.currentTarget;
				item.removeEventListener('click', this, false);
				item.removeEventListener(transitionEnd, this, false);
				var index = this.items.indexOf(item);
				if (index !== -1) {
					this.container.removeChild(this.items[index]);
					this.items.splice(index, 1);
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(event) {
				switch (event.type) {
					case transitionEnd:
						this.remove(event);
						break;
					case 'click':
						this.animation(event);
						break;
					default:
				}
			}
		}]);

		return Growl;
	})();

	function getInstance() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		instance = instance || new Growl(options);
		return instance;
	}

	module.exports = getInstance;
});
//# sourceMappingURL=growl.js.map
