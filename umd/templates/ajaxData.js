;
(function(global, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    global.<%= namespace %> = factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window) {

  <%= contents %>

  if (typeof define === 'function' && (define.amd || define.cmd)) { // AMD Module
    define(function(require) {
      return <%= exports %>;
    });

  }

  return <%= exports %>;

}));