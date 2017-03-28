'use strict'

const jsdom = require('jsdom')

global.document = jsdom.jsdom('<body></body>')
global.window = global.document.defaultView
global.HTMLElement = global.window.HTMLElement
global.HTMLElement.prototype.insertAdjacentHTML = function (position, text) {
	position = position.toLowerCase()
	this.innerHTML = text
}
global.HTMLElement.prototype.dataset = {}
