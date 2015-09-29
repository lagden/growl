'use strict'

define [
  'component/growl'
], (Growl) ->

  $ = document.querySelector.bind document
  g = new Growl()

  $('#bt').addEventListener 'click', () ->
    g.notifica 'Yeahh', 'ES6 is life!!', 'theNotification--theme-red'
    return

  return
