/*!
 * Growl v0.1.0
 * Plugin to show notification like Growl
 * http://lagden.github.io/growl
 * MIT license
 */

/* global define */

(function(window, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['./lib/util'], function(utility) {
      return factory(window, utility);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(window, require('./lib/util'));
  } else {
    window.Growl = factory(window, window.utility);
  }

}(window, function(window, utility) {

  var doc = window.document;
  var animationEnd = utility.animationEvent(doc)[3];

  function Growl (target, options) {
    this.opts = {
      duration: 5000,
      offset: 10
    };
    this.items = [];
    this.container = target || document.body;

    utility.objectAssign(this.opts, options);
  }

  Growl.prototype = {
    template: function template() {
      return [
        '<h3 class="theNotification__title">{title}</h3>',
        '<p class="theNotification__msg">{msg}</p>'
      ].join('');
    },

    notifica: function notifica(t, m) {
      var self = this;
      var tempo;
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

      var content = this.template().replace(/\{(.*?)\}/g, function cb(a, b) {
        return r[b];
      });
      var item = document.createElement('div');

      item.insertAdjacentHTML('afterbegin', content);
      item.style.opacity = 0;
      item.style.top = offset[1] + 'px';
      item.style.right = this.opts.offset + 'px';
      item.dataset.offset = offset[1];
      item.className = 'theNotification theNotification--show';
      item.addEventListener('click', this, false);

      this.container.appendChild(item);
      this.items.push(item);

      function cbTimeout() {
        self.animation(null, item);
        clearTimeout(tempo);
      }

      tempo = setTimeout(cbTimeout, this.opts.duration);
    },

    animation: function animation(event, item) {
      if (event) {
        item = event.currentTarget;
      }
      item.addEventListener(animationEnd, this, false);
      item.classList.add('theNotification--remove');
    },

    remove: function remove(event) {
      var item = event.currentTarget;
      item.removeEventListener('click', this, false);
      item.removeEventListener(animationEnd, this, false);
      var index = this.items.indexOf(item);
      if (index !== -1) {
        this.container.removeChild(this.items[index]);
        this.items.splice(index, 1);
      }
    },

    handleEvent: function handleEvent(event) {
      switch (event.type) {
        case animationEnd: this.remove(event); break;
        case 'click': this.animation(event);
      }
    }
  };

  var instance = null;
  function getInstance(target, options) {
    options = options || {};
    instance = instance || new Growl(target, options);
    return instance;
  }

  return getInstance;

}));
