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

    const wheel = document.createElement('div');
    wheel.className = 'ad-one-wheel';
    wheel.setAttribute('role', 'img');
    wheel.setAttribute('aria-label', 'Illustrative eight-section prize wheel: $200, $400, $600, $800, $1,000, $1,200, $1,500 and $2,000. No cash awarded here.');
    const amounts = ['$200','$400','$600','$800','$1,000','$1,200','$1,500','$2,000'];
    const point = (r,a) => [160+r*Math.cos(a*Math.PI/180),160+r*Math.sin(a*Math.PI/180)];
    let sectors = '';
    amounts.forEach((amount,i) => {
      const angle = -90+i*45, mid = angle+22.5;
      const a=point(143,angle), b=point(143,angle+45), t=point(94,mid);
      sectors += '<path d="M160 160 L'+a.join(' ')+' A143 143 0 0 1 '+b.join(' ')+' Z" fill="'+(i%2?'#ffe5a0':'#9d1025')+'" stroke="#e4af45" stroke-width="2"/>';
      sectors += '<text x="'+t[0]+'" y="'+t[1]+'" transform="rotate('+(mid+90)+' '+t.join(' ')+')" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="21" font-weight="900" fill="'+(i%2?'#630b18':'#fff2bf')+'">'+amount+'</text>';
    });
    wheel.innerHTML = '<svg class="ad-one-wheel-disc" viewBox="0 0 320 320" aria-hidden="true"><circle cx="160" cy="160" r="155" fill="#f4c762" stroke="#fff0b8" stroke-width="4"/>'+sectors+'<circle cx="160" cy="160" r="26" fill="#ffdf87" stroke="#b57b22" stroke-width="5"/><path d="m148 160 8 8 16-18" stroke="#7f101e" stroke-width="5" fill="none"/></svg><span class="ad-one-wheel-pointer" aria-hidden="true">▼</span>';

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
    link.classList.add('ad-one-wheel-design');
    link.append(emblem,heading,wheel,description,cta,stars);
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
    function paint(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play animation':'Pause animation');}
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
