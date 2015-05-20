# Growl [![Build Status](https://travis-ci.org/lagden/growl.svg?branch=master)](https://travis-ci.org/lagden/growl)

> Plugin to show notification like Growl


## Install

Via [Bower](http://bower.io/)

```
bower install lagden-growl
```

Via [Volo](http://volojs.org/)

```
volo add lagden/growl/0.1.0#es5
```


### Usage

It's a `Singleton Library`

```javascript
var growl = new Growl(document.body, {
  duration: 7000
  offset: 20
});

for(var i=-1; ++i < 10;) {
  growl.notifica('Count...', i);
}
```

## License

MIT © [Thiago Lagden](http://lagden.in)
