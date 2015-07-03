/* global QUnit, Growl */

'use strict';

QUnit.test('singleton test', function(assert) {
  var instanceOne = new Growl({
    duration: 10000
  });
  var instanceTwo = new Growl();
  assert.deepEqual(
    instanceOne,
    instanceTwo,
    'instanceOne and instanceTwo can be the same'
  );
});

QUnit.test('color test', function(assert) {
  var growl = new Growl();
  growl.notifica('Title', 'Awesome message', 'blue');
  assert.ok(
    growl.items[0].classList.contains('blue'),
    'Esperado a cor azul'
  );
});
