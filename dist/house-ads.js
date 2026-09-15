(() => {
  const slots = [
    document.getElementById("adTowerLeft"),
    document.getElementById("adLeft"),
    document.getElementById("adTowerRight"),
    document.getElementById("adRight")
  ].filter(Boolean);

  const creatives = [
    {
      icon: "▦",
      eyebrow: "DAILY LETTER",
      headline: "A New Puzzle Every Day",
      description: "Find one hidden five-letter word in six tries.",
      button: "Play Today",
      href: "/"
    },
    {
      icon: "✦",
      eyebrow: "HOW TO PLAY",
      headline: "Use Every Color Clue",
      description: "Green, gold and gray help guide your next guess.",
      button: "Learn the Rules",
      href: "/about.html"
    },
    {
      icon: "🔥",
      eyebrow: "OPTIONAL PLAYER ID",
      headline: "Track Your Daily Streak",
      description: "Create a Player ID to save statistics and streaks.",
      button: "See Game Features",
      href: "/about.html"
    },
    {
      icon: "Aa",
      eyebrow: "BROWSER WORD GAME",
      headline: "Play With No Download",
      description: "Enjoy Daily Letter directly in your web browser.",
      button: "Learn More",
      href: "/about.html"
    },
    {
      icon: "⌨",
      eyebrow: "FIVE-LETTER PUZZLE",
      headline: "Guess at Your Own Pace",
      description: "Enter valid words and use the clues after each try.",
      button: "Start the Puzzle",
      href: "/"
    },
    {
      icon: "?",
      eyebrow: "NEED HELP?",
      headline: "Daily Letter Game Guide",
      description: "Read the rules and learn how each clue works.",
      button: "View the Guide",
      href: "/about.html"
    },
    {
      icon: "●",
      eyebrow: "PLAYER PRIVACY",
      headline: "Account Creation Is Optional",
      description: "Play without registering or review how data is used.",
      button: "Privacy Details",
      href: "/privacy.html"
    },
    {
      icon: "✉",
      eyebrow: "CONTACT DAILY LETTER",
      headline: "Questions or Feedback?",
      description: "Send account, privacy or technical questions securely.",
      button: "Contact Us",
      href: "/contact.html"
    }
  ];

  function randomIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const value = new Uint32Array(1);
      window.crypto.getRandomValues(value);
      return value[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function shuffled(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = randomIndex(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const selected = shuffled(creatives).slice(0, slots.length);

  slots.forEach((slot, index) => {
    const creative = selected[index];
    const link = document.createElement("a");
    link.className = "house-ad-card";
    link.href = creative.href;
    link.setAttribute("aria-label", creative.headline + ". " + creative.button);

    const label = document.createElement("span");
    label.className = "house-ad-label";
    label.textContent = "ADVERTISEMENT · DAILY LETTER";

    const icon = document.createElement("span");
    icon.className = "house-ad-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = creative.icon;

    const copy = document.createElement("span");
    copy.className = "house-ad-copy";

    const eyebrow = document.createElement("span");
    eyebrow.className = "house-ad-eyebrow";
    eyebrow.textContent = creative.eyebrow;

    const heading = document.createElement("strong");
    heading.className = "house-ad-headline";
    heading.textContent = creative.headline;

    const description = document.createElement("span");
    description.className = "house-ad-description";
    description.textContent = creative.description;

    const button = document.createElement("span");
    button.className = "house-ad-button";
    button.textContent = creative.button;

    copy.append(eyebrow, heading, description);
    link.append(label, icon, copy, button);
    slot.classList.add("house-ad-slot");
    slot.replaceChildren(link);
  });
})();
