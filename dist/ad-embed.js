(() => {
  const AD_SELECTOR = [
    '#adTowerLeft a[href]',
    '#adLeft a[href]',
    '#adTowerRight a[href]',
    '#adRight a[href]'
  ].join(',');

  function safeDestination(value) {
    try {
      const url = new URL(value, window.location.href);
      return ['https:', 'http:'].includes(url.protocol) &&
        !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  const shell = document.createElement('section');
  shell.className = 'ad-embed-shell';
  shell.setAttribute('aria-label', 'Advertisement destination');
  shell.setAttribute('aria-hidden', 'true');

  const frame = document.createElement('iframe');
  frame.className = 'ad-embed-frame';
  frame.title = 'Advertisement destination';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allow = 'autoplay; fullscreen';
  frame.setAttribute(
    'sandbox',
    'allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
  );

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'ad-embed-close';
  close.setAttribute('aria-label', 'Close advertisement and return to game');
  close.textContent = '×';

  shell.append(frame, close);
  document.body.append(shell);

  function openEmbedded(destination) {
    shell.classList.add('is-open');
    shell.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ad-embed-open');
    frame.src = destination;
    close.focus({ preventScroll: true });
  }

  function closeEmbedded() {
    shell.classList.remove('is-open');
    shell.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ad-embed-open');
    frame.src = 'about:blank';
  }

  close.addEventListener('click', closeEmbedded);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && shell.classList.contains('is-open')) {
      closeEmbedded();
    }
  });

  // Capture the click before the ad's normal navigation. The destination loads
  // inside this document, so the game document remains the fullscreen document.
  document.addEventListener('click', event => {
    if (!event.isTrusted || event.defaultPrevented) return;
    const link = event.target.closest && event.target.closest(AD_SELECTOR);
    if (!link) return;

    const destination = safeDestination(link.href);
    if (!destination) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const root = document.documentElement;
    const request = root.requestFullscreen || root.webkitRequestFullscreen;

    openEmbedded(destination);

    if (!document.fullscreenElement && !document.webkitFullscreenElement && request) {
      try {
        const result = request.call(root, { navigationUI: 'hide' });
        if (result && typeof result.catch === 'function') result.catch(() => {});
      } catch {
        // The embedded page still fills the browser viewport if fullscreen is denied.
      }
    }
  }, true);
})();
