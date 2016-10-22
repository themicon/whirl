const $selector = document.querySelector('.whirl-selector');
const $container = document.querySelector('.whirl-container');
const $button = document.querySelector('button');

const changeWhirl = (idx) => {
  const $selected = $selector.options[idx];
  $selector.selectedIndex = idx;
  const requiredEl = parseInt($selected.getAttribute('data-required-el'), 10);
  $container.innerHTML = '';
  if (requiredEl === 0) {
    $container.setAttribute('data-whirl', $selected.value);
  } else if (requiredEl === 1) {
    $container.removeAttribute('data-whirl');
    const $whirl = document.createElement('div');
    $whirl.setAttribute('data-whirl', $selected.value);
    $container.appendChild($whirl);
  } else {
    $container.removeAttribute('data-whirl');
    const $whirl = document.createElement('div');
    $whirl.setAttribute('data-whirl', $selected.value);
    for(let i = 1; i < requiredEl; i++) {
      $whirl.appendChild(document.createElement('div'));
    }
    $container.appendChild($whirl);
  }
}

const update = (e) => {
  changeWhirl($selector.selectedIndex);
}

$selector.addEventListener('change', update);

const randomWhirl = () => {
  const rand = Math.floor(Math.random() * ($selector.length - 1));
  changeWhirl(rand);
};

randomWhirl();

$button.addEventListener('click', randomWhirl);
