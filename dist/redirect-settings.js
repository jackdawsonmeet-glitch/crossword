// Opens the destination in a full-page frame, preserving existing fullscreen.
// Destination must permit iframe embedding. Open directly is available otherwise.
// AUTO REDIRECT SETTINGS — edit these three values and commit this file.
// enabled: true turns redirects ON; false turns them OFF.
// delaySeconds: seconds after the page finishes loading.
// destination: full URL of your other gaming website.
// Replace sample.com with your real URL before enabling.
// Applies to the game homepage, including when the registration popup is open.
// It does not submit unfinished forms or pass player details to the destination.
window.GAME_REDIRECT = {
  enabled: true,
  delaySeconds: 10,
  destination: "https://celebrated-baklava-653d75.netlify.app"
};
