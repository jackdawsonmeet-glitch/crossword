(() => {
  function scheduleRedirect() {
    const settings = window.GAME_REDIRECT;
    if (!settings || settings.enabled !== true) return;
    const seconds = settings.delaySeconds;
    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0 || seconds > 2147483) return;
    let destination;
    try { destination = new URL(settings.destination); } catch { return; }
    if (!['https:', 'http:'].includes(destination.protocol) || destination.username || destination.password) return;
    // Avoid redirecting back to this same game and trapping the Back button.
    if (destination.origin === window.location.origin) return;
    window.setTimeout(() => window.location.replace(destination.href), seconds * 1000);
  }
  if (document.readyState === 'complete') scheduleRedirect();
  else window.addEventListener('load', scheduleRedirect, { once: true });
})();
