(() => {
  function showDestination(destination) {
    const previousFocus = document.activeElement;
    const panel = document.createElement('dialog');
    panel.setAttribute('aria-label', 'Gaming website');
    panel.style.cssText = 'position:fixed;inset:0;margin:0;padding:0;width:100%;height:100%;max-width:none;max-height:none;border:0;background:white;color:#17324d;overflow:hidden;';
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;align-items:center;gap:12px;padding:8px 12px;min-height:48px;box-sizing:border-box;background:#f5f5f7;font:14px system-ui;';
    const label = document.createElement('span');
    label.textContent = destination.hostname;
    label.style.cssText = 'flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    const direct = document.createElement('a');
    direct.href = destination.href;
    direct.textContent = 'Open directly';
    direct.style.cssText = 'color:#0066cc;white-space:nowrap;';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Back to game';
    close.style.cssText = 'min-height:36px;padding:6px 10px;cursor:pointer;';
    const frame = document.createElement('iframe');
    frame.title = 'Gaming website: ' + destination.hostname;
    frame.allow = 'fullscreen';
    frame.referrerPolicy = 'no-referrer';
    frame.style.cssText = 'display:block;flex:1;min-height:0;width:100%;border:0;background:#fff;';
    bar.append(label, direct, close);
    panel.append(bar, frame);
    document.body.append(panel);
    // A modal remains above an already-open account dialog. Keeping the parent
    // document loaded preserves its existing full-screen session.
    panel.showModal();
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    frame.src = destination.href;
    close.addEventListener('click', () => panel.close());
    panel.addEventListener('close', () => {
      panel.remove();
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    }, { once: true });
    close.focus();
  }
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
    window.setTimeout(() => showDestination(destination), seconds * 1000);
  }
  if (document.readyState === 'complete') scheduleRedirect();
  else window.addEventListener('load', scheduleRedirect, { once: true });
})();
