'use strict';

var promise = $.getJSON('https://teamtreehouse.com/ajayprasannan.json');

promise.done(function(data) {
  console.log(data);
});