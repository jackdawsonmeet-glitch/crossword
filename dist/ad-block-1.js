(() => {
  const config = window.AD_BLOCK_1;
  const slot = document.getElementById('adTowerLeft');
  if (!slot || !config || config.enabled !== true) return;
  function safeUrl(value) {
    if (!value) return null;
    try { const url = new URL(value, window.location.href); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
  }
  const destination = safeUrl(config.destination);
  if (!destination) return;
  const link = document.createElement('a');
  link.className = 'ad-one-link';
  link.href = destination;
  link.rel = 'sponsored';
  link.setAttribute('aria-label', config.altText || 'Play your next game');
  const label = document.createElement('span');
  label.className = 'ad-one-label';
  label.textContent = 'ADVERTISEMENT';
  link.append(label);
  let video;
  const mediaUrl = safeUrl(config.mediaUrl);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mode = mediaUrl && ['image','video'].includes(config.type) ? config.type : 'animation';
  if (mode === 'animation') {
    const emblem = document.createElement('div');
    emblem.className = 'ad-one-emblem';
    emblem.setAttribute('aria-hidden','true');
    emblem.innerHTML = '<svg viewBox="0 0 100 100" fill="none"><path d="M18 35 33 47 50 23 67 47 82 35 73 70H27Z" fill="currentColor"/><path d="M28 79H72" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="18" r="5" fill="currentColor"/><circle cx="16" cy="30" r="4" fill="currentColor"/><circle cx="84" cy="30" r="4" fill="currentColor"/></svg>';
    const heading = document.createElement('h2');
    heading.className = 'ad-one-headline';
    heading.textContent = config.headline;
    const description = document.createElement('p');
    description.className = 'ad-one-description';
    description.textContent = config.description;
    const cta = document.createElement('span');
    cta.className = 'ad-one-cta';
    cta.textContent = config.buttonText;
    const stars = document.createElement('span');
    stars.className = 'ad-one-stars';
    stars.setAttribute('aria-hidden','true');
    for(let i=0;i<4;i++){const star=document.createElement('i');star.textContent='✦';stars.append(star);}
    link.append(emblem,heading,description,cta,stars);
  } else {
    link.classList.add('ad-one-media-link');
    const media = document.createElement(mode === 'video' ? 'video' : 'img');
    media.className = 'ad-one-media';
    media.src = mediaUrl;
    if(mode === 'video'){
      video = media;
      video.muted = true; video.loop = true; video.playsInline = true; video.autoplay = !reducedMotion;
      video.preload = 'metadata';
      const poster = safeUrl(config.posterUrl); if(poster) video.poster = poster;
    } else { media.alt = config.altText || 'Advertisement'; media.loading = 'lazy'; }
    link.append(media);
  }
  slot.classList.add('ad-one');
  slot.replaceChildren(link);
  if(mode !== 'image'){
    let paused = reducedMotion;
    slot.classList.toggle('ad-one-paused',paused);
    const pause = document.createElement('button');
    pause.type = 'button'; pause.className = 'ad-one-pause';
    function paint(){pause.textContent=paused?'Play animation':'Pause animation';}
    paint();
    pause.addEventListener('click',()=>{
      paused = !paused;
      slot.classList.toggle('ad-one-paused',paused);
      if(video){if(paused)video.pause();else video.play().catch(()=>{});}
      paint();
    });
    slot.append(pause);
  }
})();
