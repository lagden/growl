# Growl
[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][cover-img]][cover]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[npm-img]:       https://img.shields.io/npm/v/lagden-growl.svg
[npm]:           https://www.npmjs.com/package/lagden-growl
[ci-img]:        https://travis-ci.org/lagden/growl.svg
[ci]:            https://travis-ci.org/lagden/growl
[cover-img]:     https://coveralls.io/repos/github/lagden/growl/badge.svg?branch=master
[cover]:         https://coveralls.io/github/lagden/growl?branch=master
[dep-img]:       https://david-dm.org/lagden/growl.svg
[dep]:           https://david-dm.org/lagden/growl
[devDep-img]:    https://david-dm.org/lagden/growl/dev-status.svg
[devDep]:        https://david-dm.org/lagden/growl#info=devDependencies


Plugin to show notification like Growl

## Install

Via [NPM](https://www.npmjs.com/)

```
npm i -S lagden-growl
```


## Usage

Take a look in [example](https://github.com/lagden/growl/blob/master/example/index.html)


## API

```js
var growl = new Growl(options);
```

### Params

Name        | Type     | Default   | Description
----------- | -------- | --------- | -----------
options     | `object` | see below | Initial options

#### options

Name        | Type     | Default | Description
----------- | -------- | ------- | -----------
duration    | `number` | `7000`  | Time to self remove
offset      | `number` | `10`    | Margin between growl boxes
position    | `string` | `right` | Side of growl


## License

MIT © [Thiago Lagden](http://lagden.in)
