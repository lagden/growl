'use strict';

import test from 'ava';
import simulant from 'simulant';
import Growl from '../src/index';

const g = new Growl({
	offset: 11,
	duration: 200,
	findZ: true
});

test('options', t => {
	t.is(g.opts.offset, 11);
	t.is(g.opts.duration, 200);
	t.is(g.opts.position, 'right');
});

test.cb('notifica', t => {
	t.plan(2);
	g.notifica('Yeahh', 'JS is life!!', 'theNotification--theme-red');
	g.notifica('Yeahh', 'JS is life!!', 'theNotification--theme-red');

	t.is(g.items.length, 2);
	simulant.fire(g.items[0], 'click');
	g.remove(null, g.items[1]);

	setTimeout(() => {
		t.is(g.items.length, 1);
		t.end();
	}, 300);
});
