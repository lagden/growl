'use strict';

import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	dest: 'dist/growl.js',
	format: 'umd',
	moduleName: 'Growl',
	plugins: [
		buble(),
		nodeResolve({
			jsnext: true,
			main: true
		})
	],
	sourceMap: true
};
