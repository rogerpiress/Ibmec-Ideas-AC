// Smooth logo scale on hover/focus/touch
(function () {
  const logo = document.querySelector('.sidebar img');
  if (!logo) return;

  // Ensure the image is focusable for keyboard users
  logo.setAttribute('tabindex', '0');
  logo.style.transition = 'transform 250ms ease';
  logo.style.transformOrigin = 'center center';

  function scaleUp() {
    logo.style.transform = 'scale(1.12)';
  }
  function scaleDown() {
    logo.style.transform = '';
  }

  logo.addEventListener('mouseenter', scaleUp);
  logo.addEventListener('mouseleave', scaleDown);
  logo.addEventListener('focus', scaleUp);
  logo.addEventListener('blur', scaleDown);

  // Simple touch support: tap toggles scale briefly
  let touchTimer = null;
  logo.addEventListener('touchstart', function (e) {
    scaleUp();
    if (touchTimer) clearTimeout(touchTimer);
    touchTimer = setTimeout(scaleDown, 400);
  }, { passive: true });
})();
