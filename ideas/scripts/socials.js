// socials.js — add small interaction and accessibility tweaks for social buttons
(function () {
  const socials = document.querySelectorAll('.social');
  if (!socials || socials.length === 0) return;

  socials.forEach(function (el) {
    // ensure focusable
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    // smooth transform
    el.style.transition = el.style.transition || 'transform 160ms ease';
    el.style.transformOrigin = 'center center';

    function scaleUp() { el.style.transform = 'scale(1.08)'; }
    function scaleDown() { el.style.transform = ''; }

    el.addEventListener('mouseenter', scaleUp);
    el.addEventListener('mouseleave', scaleDown);
    el.addEventListener('focus', scaleUp);
    el.addEventListener('blur', scaleDown);

    // touch: quick scale feedback
    el.addEventListener('touchstart', function () {
      scaleUp();
      setTimeout(scaleDown, 350);
    }, { passive: true });

    // make external links open in a new tab if not already specified
    el.addEventListener('click', function (e) {
      const href = el.getAttribute('href');
      if (!href) return;
      // ignore hash links
      if (href.startsWith('#')) return;
      // if it's an external link or not same origin, open in new tab
      try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      } catch (err) {
        // if URL parsing fails, still set safe target
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
})();
