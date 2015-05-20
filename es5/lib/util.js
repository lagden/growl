/*!
 * Utility
 * Some helpers
 * http://lagden.github.io/growl
 * MIT license
 */

/* global define */

(function(window, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    window.utility = factory();
  }

}(window, function factory() {

  function detect(lista, d) {
    while (lista.length) {
      var item = lista.shift();
      if (d.documentElement.style[item[0]] !== undefined) {
        return item;
      }
    }
    return lista[0];
  }

  function transitionEvent(d) {
    var VENDOR = [
      ['transition', 'transitionend'],
      ['MozTransition', 'mozTransitionEnd'],
      ['OTransition', 'oTransitionEnd'],
      ['webkitTransition', 'webkitTransitionEnd']
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
      ], [
        'MozAnimation',
        'mozAnimationStart',
        'mozAnimationIteration',
        'mozAnimationEnd'
      ], [
        'OAnimation',
        'oAnimationStart',
        'oAnimationIteration',
        'oAnimationEnd'
      ], [
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

  return {
    'transitionEvent': transitionEvent,
    'animationEvent': animationEvent,
    'objectAssign': objectAssign
  };

}));
