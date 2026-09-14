(() => {
  const config = window.AD_BLOCK_4;
  const slot = document.getElementById("adRight");
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
  link.className = "ad-four-link";
  link.href = destination;
  link.rel = "sponsored";
  link.setAttribute("aria-label", config.altText || "Play another game");

  const mediaUrl = safeUrl(config.mediaUrl);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mode = mediaUrl && ["image", "video"].includes(config.type) ? config.type : "animation";
  let video;

  if (mode === "animation") {
    const copy = document.createElement("div");
    copy.className = "ad-four-copy";
    const kicker = document.createElement("span");
    kicker.className = "ad-four-kicker";
    kicker.textContent = "ADVERTISEMENT";
    const heading = document.createElement("h2");
    heading.className = "ad-four-headline";
    heading.textContent = config.headline;
    const description = document.createElement("p");
    description.className = "ad-four-description";
    description.textContent = config.description;
    copy.append(kicker, heading, description);

    const game = document.createElement("div");
    game.className = "ad-four-game";
    game.setAttribute("aria-hidden", "true");
    ["W", "O", "R", "D"].forEach(letter => {
      const tile = document.createElement("span");
      tile.className = "ad-four-tile";
      tile.textContent = letter;
      game.append(tile);
    });

    const cta = document.createElement("span");
    cta.className = "ad-four-cta";
    cta.textContent = config.buttonText;
    link.append(copy, game, cta);
  } else {
    link.classList.add("ad-four-media-link");
    const label = document.createElement("span");
    label.className = "ad-four-label";
    label.textContent = "ADVERTISEMENT";
    const media = document.createElement(mode === "video" ? "video" : "img");
    media.className = "ad-four-media";
    media.src = mediaUrl;
    media.style.setProperty("--ad-four-fit", config.fit === "contain" ? "contain" : "cover");
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
    link.append(media, label);
  }

  slot.classList.add("ad-four");
  slot.replaceChildren(link);

  if (mode !== "image") {
    let paused = reducedMotion;
    slot.classList.toggle("ad-four-paused", paused);
    const pause = document.createElement("button");
    pause.type = "button";
    pause.className = "ad-four-pause";
    const paint = () => {
      pause.textContent = paused ? "▶" : "Ⅱ";
      pause.setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
    };
    paint();
    pause.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      paused = !paused;
      slot.classList.toggle("ad-four-paused", paused);
      if (video) {
        if (paused) video.pause();
        else video.play().catch(() => {});
      }
      paint();
    });
    slot.append(pause);
  }
})();
