/*!
whirl.css - http://jh3y.github.io/whirl
@license MIT

jh3y (c) 2015.
!*/
(function() { var Whirl;

Whirl = window.Whirl = function(selector, whirl) {
  this.el = document.querySelector(selector);
  return this.whirl = whirl;
};

Whirl.prototype.show = function(whirl) {
  if (whirl) {
    this.whirl = whirl;
  }
  return this.el.classList.add(this.whirl);
};

Whirl.prototype.hide = function() {
  return this.el.classList.remove(this.whirl);
};
 }());