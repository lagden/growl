'use strict'

import {extend, transitionEvent} from 'lagden-utils'

const transitionEnd = transitionEvent()

function last(arr) {
	const length = arr === null ? 0 : arr.length
	return length ? arr[length - 1] : undefined
}

function del(obj, prop) {
	obj[prop] = null
	if ('Reflect' in window) {
		Reflect.deleteProperty(obj, prop)
	} else {
		delete obj[prop]
	}
}

class Growl {
	constructor(opts = {}) {
		this.opts = extend({
			duration: 7000,
			offset: 10,
			position: 'right',
			container: document.body
		}, opts)
		this.items = []
	}

	template(dados) {
		const {title, msg} = dados
		return [
			`<h3 class="growl__title">${title}</h3>`,
			`<p class="growl__msg">${msg}</p>`
		].join('')
	}

	notifica(title, msg, colorCss = false) {
		const offset = [this.opts.offset, this.opts.offset]
		const r = {title, msg}
		const lastItem = last(this.items)
		if (lastItem) {
			offset[0] = Number(lastItem.dataset.offset)
			offset[1] = offset[0] + lastItem.offsetHeight + this.opts.offset
		}

		const item = document.createElement('div')
		item.insertAdjacentHTML('afterbegin', this.template(r))
		item.style.top = `${offset[1]}px`
		item.style[this.opts.position || 'right'] = `${this.opts.offset}px`
		item.dataset.offset = offset[1]
		item.classList.add('growl')
		if (typeof colorCss === 'string') {
			item.classList.add(colorCss)
		}
		item.addEventListener('click', this, false)

		const docfrag = document.createDocumentFragment()
		docfrag.appendChild(item)

		this.items.push(item)
		this.opts.container.appendChild(docfrag)

		window.getComputedStyle(item).getPropertyValue('opacity')
		item.style.willChange = 'transform, opacity'
		item.classList.add('growl--show')

		item.tempo = setTimeout(() => {
			this.animation(null, item)
		}, this.opts.duration)
	}

	animation(event, item) {
		if (event) {
			item = event.currentTarget
		}
		clearTimeout(item.tempo)
		del(item, 'tempo')
		item.addEventListener(transitionEnd, this, false)
		item.classList.add('growl--remove')
	}

	remove(event, item) {
		if (event) {
			item = event.currentTarget
		}
		item.style.willChange = 'auto'
		item.removeEventListener('click', this, false)
		item.removeEventListener(transitionEnd, this, false)
		item.parentElement.removeChild(item)
		const index = this.items.findIndex(el => item === el)
		if (index > -1) {
			this.items[index] = null
			this.items.splice(index, 1)
		}
	}

	handleEvent(event) {
		switch (event.type) {
			case transitionEnd:
				this.remove(event)
				break
			case 'click':
				this.animation(event)
				break
			default:
		}
	}
}

export default Growl
