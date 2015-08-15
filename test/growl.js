/* global QUnit, growl */

'use strict';

QUnit.test('singleton test', function(assert) {
  var instanceOne = growl({
    duration: 10000
  });
  var instanceTwo = growl();
  assert.deepEqual(
    instanceOne,
    instanceTwo,
    'instanceOne and instanceTwo can be the same'
  );
});

QUnit.test('color test', function(assert) {
  var growlInstance = growl();
  growlInstance.notifica('Title', 'Awesome message', 'blue');
  assert.ok(
    growlInstance.items[0].classList.contains('blue'),
    'Esperado a cor azul'
  );
});
