(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', './lib/util'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('./lib/util'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.util);
		global.growl = mod.exports;
	}
})(this, function (exports, module, _libUtil) {
	/* Growl
  * Plugin to show notification like Growl
  * http://lagden.github.io/growl
  * MIT license
  */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var doc = window ? window.document : global;
	var transitionEnd = (0, _libUtil.transitionEvent)(doc);

	var Growl = (function () {
		function Growl(options) {
			_classCallCheck(this, Growl);

			this.opts = {
				target: doc.body,
				duration: 5000,
				offset: 10
			};
			(0, _libUtil.objectAssign)(this.opts, options);
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

				var colorCss = arguments[2] === undefined ? false : arguments[2];

				var offset = [this.opts.offset, this.opts.offset];
				var r = {
					title: t,
					msg: m
				};

				var last = this.items[this.items.length - 1];
				if (last !== undefined) {
					offset[0] = last.dataset.offset - '';
					offset[1] = offset[0] + last.offsetHeight + this.opts.offset;
				}

				var content = this.template().replace(/\{(.*?)\}/g, function (a, b) {
					return r[b];
				});
				var item = doc.createElement('div');

				item.insertAdjacentHTML('afterbegin', content);
				item.addEventListener('click', this, false);
				item.style.top = '' + offset[1] + 'px';
				item.style.right = '' + this.opts.offset + 'px';
				item.dataset.offset = offset[1];
				item.classList.add('theNotification');
				if (typeof colorCss === 'string') {
					item.classList.add(colorCss);
				}

				this.items.push(item);
				this.container.appendChild(item);

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

	var instance = null;
	function getInstance() {
		var options = arguments[0] === undefined ? {} : arguments[0];

		instance = instance || new Growl(options);
		return instance;
	}

	module.exports = getInstance;
});
//# sourceMappingURL=growl.js.map