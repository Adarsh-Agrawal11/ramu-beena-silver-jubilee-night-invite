
let backgroundAudio = null;
let isMuted = false;
let startTimer = null;

function getAudio() {
  if (!backgroundAudio) {
    backgroundAudio = new Audio('/song.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.preload = 'auto';
    backgroundAudio.volume = 0.28;
  }
  return backgroundAudio;
}

export function startMusic() {
  const audio = getAudio();

  clearTimeout(startTimer);

  if (isMuted || document.hidden) return;

  startTimer = setTimeout(async () => {
    if (isMuted || document.hidden) return;

    try {
      await audio.play();
      window.dispatchEvent(new Event('music-state'));
    } catch (error) {
      // Browser may block autoplay until a user gesture.
      window.dispatchEvent(new Event('music-state'));
    }
  }, 1200);
}

export async function toggleMusic() {
  const audio = getAudio();

  if (!isMuted && !audio.paused) {
    isMuted = true;
    clearTimeout(startTimer);
    audio.pause();
    audio.muted = true;
  } else {
    isMuted = false;
    audio.muted = false;

    if (!document.hidden) {
      try {
        await audio.play();
      } catch (error) {
        console.log('Playback requires a user interaction.');
      }
    }
  }

  window.dispatchEvent(new Event('music-state'));
}

export function getMusicState() {
  return !isMuted && !!backgroundAudio && !backgroundAudio.paused;
}

export function setupAudioVisibility() {
  const pause = () => {
    if (document.hidden) {
      clearTimeout(startTimer);
      isMuted = true;

      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.muted = true;
      }

      window.dispatchEvent(new Event('music-state'));
    }
  };

  document.addEventListener('visibilitychange', pause);
  window.addEventListener('pagehide', pause);

  return () => {
    document.removeEventListener('visibilitychange', pause);
    window.removeEventListener('pagehide', pause);
  };
}
