/*!
 * Growl v0.1.0
 * Plugin to show notification like Growl
 * http://lagden.github.io/growl
 * MIT license
 */

'use strict';

import {animationEvent, objectAssign} from './lib/util';

let animationEnd = animationEvent(document)[3];

class Growl {
  constructor(target, options) {
    this.opts = {
      duration: 5000,
      offset: 10
    };
    this.items = [];
    this.container = target || document.body;

    objectAssign(this.opts, options);
  }

  template() {
    return [
      '<h3 class="theNotification__title">{title}</h3>',
      '<p class="theNotification__msg">{msg}</p>'
    ].join('');
  }

  notifica(t, m) {
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
    let item = document.createElement('div');

    item.insertAdjacentHTML('afterbegin', content);
    item.style.opacity = 0;
    item.style.top = `${offset[1]}px`;
    item.style.right = `${this.opts.offset}px`;
    item.dataset.offset = offset[1];
    item.className = 'theNotification theNotification--show';
    item.addEventListener('click', this, false);

    this.container.appendChild(item);
    this.items.push(item);

    let tempo = setTimeout(() => {
      this.animation(null, item);
      clearTimeout(tempo);
    }, this.opts.duration);
  }

  animation(event, item) {
    if (event) {
      item = event.currentTarget;
    }
    item.addEventListener(animationEnd, this, false);
    item.classList.add('theNotification--remove');
  }

  remove(event) {
    let item = event.currentTarget;
    item.removeEventListener('click', this, false);
    item.removeEventListener(animationEnd, this, false);
    let index = this.items.indexOf(item);
    if (index !== -1) {
      this.container.removeChild(this.items[index]);
      this.items.splice(index, 1);
    }
  }

  handleEvent(event) {
    switch (event.type) {
      case animationEnd: this.remove(event); break;
      case 'click': this.animation(event);
    }
  }
}

let instance = null;
function getInstance(target, options = {}) {
  instance = instance || new Growl(target, options);
  return instance;
}

export default getInstance;
