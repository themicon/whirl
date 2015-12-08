Whirl = window.Whirl = (selector, whirl) ->
  this.el    = document.querySelector selector
  this.whirl = whirl

Whirl::show = (whirl) ->
  if whirl then this.whirl = whirl
  this.el.classList.add this.whirl

Whirl::hide = ->
  this.el.classList.remove this.whirl
