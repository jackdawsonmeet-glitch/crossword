(() => {
  const config = window.AD_BLOCK_2;
  const slot = document.getElementById("adLeft");
  if (!slot || !config || config.enabled !== true) return;

  function safeUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value, window.location.href);
      return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  const destination = safeUrl(config.destination);
  if (!destination) return;

  const link = document.createElement("a");
  link.className = "ad-two-link";
  link.href = destination;
  link.rel = "sponsored";
  link.setAttribute("aria-label", config.altText || "Learn more");


  const mediaUrl = safeUrl(config.mediaUrl);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mode = mediaUrl && ["image", "video"].includes(config.type) ? config.type : "animation";
  let video;

  if (mode === "animation") {
    const packageIcon = document.createElement("div");
    packageIcon.className = "ad-two-package";
    packageIcon.setAttribute("aria-hidden", "true");

    const copy = document.createElement("div");
    copy.className = "ad-two-copy";
    const kicker = document.createElement("span");
    kicker.className = "ad-two-kicker";
    kicker.textContent = "ADVERTISEMENT";
    const heading = document.createElement("h2");
    heading.className = "ad-two-headline";
    heading.textContent = config.headline;
    const description = document.createElement("p");
    description.className = "ad-two-description";
    description.textContent = config.description;
    copy.append(kicker, heading, description);

    const cta = document.createElement("span");
    cta.className = "ad-two-cta";
    cta.textContent = config.buttonText;
    link.append(packageIcon, copy, cta);
  } else {
    link.classList.add("ad-two-media-link");
    const media = document.createElement(mode === "video" ? "video" : "img");
    media.className = "ad-two-media";
    media.src = mediaUrl;
    media.style.setProperty("--ad-two-fit", config.fit === "contain" ? "contain" : "cover");
    if (mode === "video") {
      video = media;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = !reducedMotion;
      video.preload = "metadata";
      const poster = safeUrl(config.posterUrl);
      if (poster) video.poster = poster;
    } else {
      media.alt = config.altText || "Advertisement";
      media.loading = "lazy";
    }
    const label = document.createElement("span");
    label.className = "ad-two-label";
    label.textContent = "ADVERTISEMENT";
    link.append(media, label);
  }

  slot.classList.add("ad-two");
  slot.replaceChildren(link);

  if (mode !== "image") {
    let paused = reducedMotion;
    slot.classList.toggle("ad-two-paused", paused);
    const pause = document.createElement("button");
    pause.type = "button";
    pause.className = "ad-two-pause";
    const paint = () => {
      pause.textContent = paused ? "▶" : "Ⅱ";
      pause.setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
    };
    paint();
    pause.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      paused = !paused;
      slot.classList.toggle("ad-two-paused", paused);
      if (video) {
        if (paused) video.pause();
        else video.play().catch(() => {});
      }
      paint();
    });
    slot.append(pause);
  }
})();
