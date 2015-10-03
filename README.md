# Growl 
[![NPM version](https://img.shields.io/npm/v/lagden-growl.svg)](https://www.npmjs.com/package/lagden-growl)
[![Build Status](https://travis-ci.org/lagden/growl.svg?branch=master)](https://travis-ci.org/lagden/growl)
[![Dependency Status](https://david-dm.org/lagden/growl.svg)](https://david-dm.org/lagden/growl) 
[![devDependency Status](https://david-dm.org/lagden/growl/dev-status.svg)](https://david-dm.org/lagden/growl#info=devDependencies) 

> Plugin to show notification like Growl


## Install

Via [NPM](https://www.npmjs.com/)

```
npm i lagden-growl --save
```

Via [Bower](http://bower.io/)

```
bower install lagden-growl --save
```


### Usage

It's a `Singleton Library`

```javascript
var instance = growl({
  duration: 7000
  offset: 20
});

for(var i=-1; ++i < 10;) {
  growl.notifica('Count...', i);
}
```


## License

MIT © [Thiago Lagden](http://lagden.in)
