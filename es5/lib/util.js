(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = { exports: {} };
    factory(mod.exports);
    global.util = mod.exports;
  }
}(this, function (exports) {
  /*!
   * Utility
   * Some helpers
   * http://lagden.github.io/growl
   * MIT license
   */
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  function detect(lista, d) {
    while (lista.length) {
      var item = lista.shift();
      if (d.documentElement.style[item[0]] !== void 0) {
        return item;
      }
    }
    return lista[0];
  }
  function transitionEvent(d) {
    var VENDOR = [
      [
        'transition',
        'transitionend'
      ],
      [
        'MozTransition',
        'mozTransitionEnd'
      ],
      [
        'OTransition',
        'oTransitionEnd'
      ],
      [
        'webkitTransition',
        'webkitTransitionEnd'
      ]
    ];
    return detect(VENDOR, d)[1];
  }
  /* Animation
   * 1 = Start
   * 2 = Iteration
   * 3 = End
   */
  function animationEvent(d) {
    var VENDOR = [
      [
        'animation',
        'animationstart',
        'animationiteration',
        'animationend'
      ],
      [
        'MozAnimation',
        'mozAnimationStart',
        'mozAnimationIteration',
        'mozAnimationEnd'
      ],
      [
        'OAnimation',
        'oAnimationStart',
        'oAnimationIteration',
        'oAnimationEnd'
      ],
      [
        'webkitAnimation',
        'webkitAnimationStart',
        'webkitAnimationIteration',
        'webkitAnimationEnd'
      ]
    ];
    return detect(VENDOR, d);
  }
  function objectAssign(a, b) {
    var prop;
    for (prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }
  exports.transitionEvent = transitionEvent;
  exports.animationEvent = animationEvent;
  exports.objectAssign = objectAssign;
}));