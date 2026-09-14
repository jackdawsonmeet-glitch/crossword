(() => {
  const c=window.AD_BLOCK_3,slot=document.getElementById('adTowerRight');if(!slot||!c||c.enabled!==true)return;
  function safe(value){if(!value)return null;try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:null}catch{return null}}
  const destination=safe(c.destination);if(!destination)return;
  const a=document.createElement('a');a.href=destination;a.rel='sponsored';a.className='ad-three-link';a.setAttribute('aria-label',c.altText||'Gaming advertisement');
  const el=(tag,cls,text)=>{const x=document.createElement(tag);x.className=cls;x.textContent=text||'';return x};
  const media=safe(c.mediaUrl),type=media&&['image','video'].includes(c.type)?c.type:'animation';let video;
  if(type!=='animation'){
    a.classList.add('ad-three-media-link');const label=el('span','ad-three-media-label','ADVERTISEMENT');const m=document.createElement(type==='video'?'video':'img');m.className='ad-three-media';m.src=media;m.style.objectFit=c.fit==='contain'?'contain':'cover';
    if(type==='video'){video=m;m.muted=true;m.loop=true;m.playsInline=true;m.autoplay=!matchMedia('(prefers-reduced-motion: reduce)').matches;m.preload='metadata';const poster=safe(c.posterUrl);if(poster)m.poster=poster}else{m.alt=c.altText||'Advertisement';m.loading='lazy'}
    a.append(label,m);
  }else{
    const art=el('div','ad-three-art');art.setAttribute('aria-hidden','true');let wedges='';
    for(let i=0;i<24;i++){const t=i*Math.PI/12,u=(i+1)*Math.PI/12,p=[120+96*Math.cos(t),118+96*Math.sin(t)],q=[120+96*Math.cos(u),118+96*Math.sin(u)];wedges+='<path d="M120 118 L'+p.join(' ')+' A96 96 0 0 1 '+q.join(' ')+' Z" fill="'+(i%2?'#1d1720':'#b3152c')+'" stroke="#e8bd5e"/>'}
    art.innerHTML='<svg viewBox="0 0 240 270"><circle cx="120" cy="118" r="106" fill="#eac771"/><g class="ad-three-ring">'+wedges+'</g><circle cx="120" cy="118" r="54" fill="#164738" stroke="#e8bd5e" stroke-width="5"/><text x="120" y="135" text-anchor="middle" font-size="52">♠♥</text><path d="M91 54 100 32 119 46 139 26 149 54Z" fill="#ffdb77"/></svg>';
    a.append(el('span','ad-three-label','ADVERTISEMENT'),el('span','ad-three-eyebrow',c.eyebrow),art,el('h2','ad-three-headline',c.headline),el('p','ad-three-description',c.description),el('span','ad-three-cta',c.buttonText));
  }
  slot.classList.add('ad-three');slot.replaceChildren(a);
  if(type!=='image'){let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;const b=el('button','ad-three-pause');b.type='button';const paint=()=>{b.textContent=paused?'▶':'Ⅱ';b.setAttribute('aria-label',paused?'Play animation':'Pause animation');slot.classList.toggle('ad-three-paused',paused)};paint();b.onclick=()=>{paused=!paused;if(video){paused?video.pause():video.play().catch(()=>{})}paint()};slot.append(b)}
})();
