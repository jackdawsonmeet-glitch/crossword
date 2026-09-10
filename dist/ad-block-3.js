(() => {
  const c=window.AD_BLOCK_3, slot=document.getElementById('adTowerRight');
  if(!slot || !c || c.enabled!==true)return;
  let url;try{url=new URL(c.destination);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)return;}catch{return;}
  const a=document.createElement('a');
  a.href=url.href;a.rel='sponsored';a.className='ad-three-link';
  function el(tag,cls,text){const x=document.createElement(tag);x.className=cls;x.textContent=text;return x;}
  const art=document.createElement('div');art.className='ad-three-art';art.setAttribute('aria-hidden','true');
  let wedges='';
  for(let i=0;i<24;i++){
    const t=i*Math.PI/12, u=(i+1)*Math.PI/12;
    const p=[120+96*Math.cos(t),118+96*Math.sin(t)],q=[120+96*Math.cos(u),118+96*Math.sin(u)];
    wedges+='<path d="M120 118 L'+p.join(' ')+' A96 96 0 0 1 '+q.join(' ')+' Z" fill="'+(i%2?'#1d1720':'#b3152c')+'" stroke="#e8bd5e" stroke-width="1"/>';
  }
  art.innerHTML='<svg viewBox="0 0 240 270"><circle cx="120" cy="118" r="106" fill="#eac771" stroke="#fff0b6" stroke-width="3"/><g class="ad-three-ring">'+wedges+'</g><circle cx="120" cy="118" r="54" fill="#164738" stroke="#e8bd5e" stroke-width="5"/><g transform="translate(30 115) rotate(-17 44 56)"><rect width="88" height="122" rx="9" fill="#fffaf0" stroke="#e2c48a" stroke-width="2"/><text x="10" y="29" font-size="25" font-family="Georgia" fill="#191321">A</text><text x="44" y="81" font-size="57" text-anchor="middle" fill="#191321">♠</text></g><g transform="translate(116 108) rotate(17 44 56)"><rect width="88" height="122" rx="9" fill="#fffaf0" stroke="#e2c48a" stroke-width="2"/><text x="10" y="29" font-size="25" font-family="Georgia" fill="#aa1027">A</text><text x="44" y="81" font-size="57" text-anchor="middle" fill="#aa1027">♥</text></g><g transform="translate(17 207) rotate(-10 24 24)"><rect width="48" height="48" rx="9" fill="#fff5dd" stroke="#dab870" stroke-width="2"/><g fill="#281622"><circle cx="12" cy="12" r="4"/><circle cx="36" cy="12" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="12" cy="36" r="4"/><circle cx="36" cy="36" r="4"/></g></g><circle cx="194" cy="230" r="25" fill="#af112c" stroke="#ffe5a2" stroke-width="7" stroke-dasharray="10 7"/><circle cx="194" cy="230" r="15" fill="none" stroke="#edbe65" stroke-width="2"/><path d="M91 54 100 32 119 46 139 26 149 54Z" fill="#ffdb77" stroke="#fff0b5" stroke-width="2"/></svg>';
  a.append(el('span','ad-three-label','ADVERTISEMENT'),el('span','ad-three-eyebrow',c.eyebrow),art,el('h2','ad-three-headline',c.headline),el('p','ad-three-description',c.description),el('span','ad-three-cta',c.buttonText));
  slot.classList.add('ad-three');slot.replaceChildren(a);
  let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const button=el('button','ad-three-pause','');button.type='button';
  function paint(){button.textContent=paused?'▶':'Ⅱ';button.setAttribute('aria-label',paused?'Play animation':'Pause animation');slot.classList.toggle('ad-three-paused',paused);}
  paint();button.addEventListener('click',()=>{paused=!paused;paint();});slot.append(button);
})();
