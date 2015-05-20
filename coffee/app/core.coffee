'use strict'

define [
  'templates/sample'
  'es5/growl'
], (template, Growl) ->

  $ = document.querySelector.bind document

  $info = $ '#info'
  $info.insertAdjacentHTML 'afterbegin', template
    name: navigator.appName
    version: navigator.appVersion

  g = new Growl()

  $('#bt').addEventListener 'click', () ->
    g.notifica 'Yeahh', 'ES6 is life!!'
    return

  return
