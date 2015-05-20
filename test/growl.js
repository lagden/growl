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
