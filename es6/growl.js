/*!
 * Growl
 * Plugin to show notification like Growl
 * http://lagden.github.io/growl
 * MIT license
 */

'use strict';

import {transitionEvent, objectAssign} from './lib/util';

let doc = window ? window.document : global;
let transitionEnd = transitionEvent(doc);

class Growl {
  constructor(options) {
    this.opts = {
      target: doc.body,
      duration: 5000,
      offset: 10
    };
    objectAssign(this.opts, options);
    this.items = [];
    this.container = this.opts.target;
  }

  template() {
    return [
      '<h3 class="theNotification__title">{title}</h3>',
      '<p class="theNotification__msg">{msg}</p>'
    ].join('');
  }

  notifica(t, m, colorCss = false) {
    let offset = [this.opts.offset, this.opts.offset];
    let r = {
      title: t,
      msg: m
    };

    let last = this.items[this.items.length - 1];
    if (last !== undefined) {
      offset[0] = last.dataset.offset - '';
      offset[1] = offset[0] + last.offsetHeight + this.opts.offset;
    }

    let content = this.template().replace(/\{(.*?)\}/g, (a, b) => r[b]);
    let item = doc.createElement('div');

    item.insertAdjacentHTML('afterbegin', content);
    item.addEventListener('click', this, false);
    item.style.top = offset[1] + 'px';
    item.style.right = this.opts.offset + 'px';
    item.dataset.offset = offset[1];
    item.classList.add('theNotification');
    if (typeof colorCss === 'string') {
      item.classList.add(colorCss);
    }

    this.items.push(item);
    this.container.appendChild(item);

    // Make sure the initial state is applied.
    window.getComputedStyle(item).opacity;
    item.classList.add('theNotification--show');

    let tempo = setTimeout(() => {
      this.animation(null, item);
      clearTimeout(tempo);
    }, this.opts.duration);
  }

  animation(event, item) {
    if (event) {
      item = event.currentTarget;
    }
    item.addEventListener(transitionEnd, this, false);
    item.classList.add('theNotification--remove');
  }

  remove(event) {
    let item = event.currentTarget;
    item.removeEventListener('click', this, false);
    item.removeEventListener(transitionEnd, this, false);
    let index = this.items.indexOf(item);
    if (index !== -1) {
      this.container.removeChild(this.items[index]);
      this.items.splice(index, 1);
    }
  }

  handleEvent(event) {
    switch (event.type) {
      case transitionEnd: this.remove(event); break;
      case 'click': this.animation(event);
    }
  }
}

let instance = null;
function getInstance(options = {}) {
  instance = instance || new Growl(options);
  return instance;
}

export default getInstance;
