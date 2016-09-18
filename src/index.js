'use strict';

import {extend, transitionEvent} from 'lagden-utils';

const transitionEnd = transitionEvent();

// function getZ(el) {
// 	const z = Number(window.getComputedStyle(el).getPropertyValue('z-index'));
// 	return isNaN(z) ? 0 : z;
// }

// function findZ() {
// 	const highestZ = [];
// 	const all = document.querySelectorAll('*');
// 	all.forEach(el => {
// 		highestZ.push(getZ(el));
// 	});
// 	return highestZ.sort((a, b) => b - a)[0];
// }

class Growl {
	set options(opts = {}) {
		extend(this.opts, opts);
	}

	constructor(opts = {}) {
		this.opts = {
			duration: 7000,
			offset: 10,
			position: 'right',
			container: document.body,
			findZ: false
		};

		this.options = opts;
		this.items = [];
	}

	template(dados) {
		const {title, msg} = dados;
		return [
			`<h3 class="growl__title">${title}</h3>`,
			`<p class="growl__msg">${msg}</p>`
		].join('');
	}

	notifica(t, m, colorCss = false) {
		const offset = [this.opts.offset, this.opts.offset];
		const r = {
			title: t,
			msg: m
		};

		const last = this.items[this.items.length - 1] || false;
		if (last) {
			offset[0] = Number(last.getAttribute('data-offset'));
			offset[1] = offset[0] + last.offsetHeight + this.opts.offset;
		}

		const item = document.createElement('div');
		item.addEventListener('click', this, false);
		item.insertAdjacentHTML('afterbegin', this.template(r));
		item.style.top = `${offset[1]}px`;
		item.style[this.opts.position || 'right'] = `${this.opts.offset}px`;
		item.setAttribute('data-offset', offset[1]);
		item.classList.add('growl');
		if (typeof colorCss === 'string') {
			item.classList.add(colorCss);
		}

		// if (this.opts.findZ) {
		// 	item.style.zIndex = findZ();
		// }

		const docfrag = document.createDocumentFragment();
		docfrag.appendChild(item);

		this.items.push(item);
		this.opts.container.appendChild(docfrag);

		// Make sure the initial state is applied.
		window.getComputedStyle(item).getPropertyValue('opacity');
		item.classList.add('growl--show');

		item.tempo = setTimeout(() => {
			this.animation(null, item);
		}, this.opts.duration);
	}

	animation(event, item) {
		if (event) {
			item = event.currentTarget;
		}
		clearTimeout(item.tempo);
		item.tempo = null;
		item.addEventListener(transitionEnd, this, false);
		item.classList.add('growl--remove');
	}

	remove(event, item) {
		if (event) {
			item = event.currentTarget;
		}
		item.removeEventListener('click', this, false);
		item.removeEventListener(transitionEnd, this, false);
		const index = this.items.indexOf(item);
		if (index !== -1) {
			this.opts.container.removeChild(this.items[index]);
			this.items[index] = null;
			this.items.splice(index, 1);
		}
	}

	handleEvent(event) {
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
}

export default Growl;
