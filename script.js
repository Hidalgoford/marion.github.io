
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const progressFill = document.getElementById('progressFill');
  const trackTitle = document.getElementById('trackTitle');
  /trackTitle.textContent = 'MY WAY';/set manual

  playBtn.addEventListener('click', async (e) => {
    if (audio.paused) {
      try {
        await audio.play();
        playBtn.textContent = '⏸';
        document.documentElement.classList.add('playing');
      } catch (err) {
        console.warn('Play request was prevented:', err);
      }
    } else {
      audio.pause();
      playBtn.textContent = '▶';
      document.documentElement.classList.remove('playing');
    }
  });

  /update progress bar
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + '%';
    }
  });

  /reset UI saat selesai
  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    progressFill.style.width = '0%';
    document.documentElement.classList.remove('playing');
  });

  /klik pada progress untuk seek
  document.querySelector('.progress').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    if (audio.duration) audio.currentTime = pct * audio.duration;
  });
});
