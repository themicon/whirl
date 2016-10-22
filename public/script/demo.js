(function() { 'use strict';

var $selector = document.querySelector('.whirl-selector');
var $container = document.querySelector('.whirl-container');

var update = function update(e) {
  var $selected = $selector.options[$selector.selectedIndex];
  var requiredEl = parseInt($selected.getAttribute('data-required-el'), 10);
  $container.innerHTML = '';
  if (requiredEl === 0) {
    $container.setAttribute('data-whirl', $selected.value);
  } else if (requiredEl === 1) {
    $container.removeAttribute('data-whirl');
    var $whirl = document.createElement('div');
    $whirl.setAttribute('data-whirl', $selected.value);
    $container.appendChild($whirl);
  } else {
    $container.removeAttribute('data-whirl');
    var _$whirl = document.createElement('div');
    _$whirl.setAttribute('data-whirl', $selected.value);
    for (var i = 1; i < requiredEl; i++) {
      _$whirl.appendChild(document.createElement('div'));
    }
    $container.appendChild(_$whirl);
  }
};

$selector.addEventListener('change', update); }());