'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const menuLabel = menuButton?.querySelector('.menu-label');

function setMenu(open, returnFocus = false) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu';
  if (returnFocus) menuButton.focus();
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) {
    setMenu(false);
  }
});

const desktopQuery = window.matchMedia('(min-width: 821px)');
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
