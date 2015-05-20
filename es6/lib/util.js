/*!
 * Utility
 * Some helpers
 * http://lagden.github.io/growl
 * MIT license
 */

'use strict';

function detect(lista, d) {
  while (lista.length) {
    let item = lista.shift();
    if (d.documentElement.style[item[0]] !== undefined) {
      return item;
    }
  }
  return lista[0];
}

function transitionEvent(d) {
  let VENDOR = [
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
  let VENDOR = [
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
  let prop;
  for (prop in b) {
    a[prop] = b[prop];
  }
  return a;
}

export {transitionEvent, animationEvent, objectAssign};
