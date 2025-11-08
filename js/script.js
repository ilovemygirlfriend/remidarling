// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // === MUSIC FLAP TOGGLE ===
  const btn = document.querySelector('.flap-toggle');
  const musicArea = document.getElementById('music-area');

  if (btn && musicArea) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        musicArea.hidden = true;
        musicArea.classList.remove('show');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        musicArea.hidden = false;
        setTimeout(() => musicArea.classList.add('show'), 10);
      }
    });
  }

  // === FLOATING EMOJIS (R & C KEYS) ===
  function showEmojis(emojiList, count = 6) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      el.textContent = emoji;

      el.style.position = 'fixed';
      el.style.left = (10 + Math.random() * 80) + 'vw';
      el.style.top = (20 + Math.random() * 60) + 'vh';
      el.style.fontSize = (50 + Math.random() * 60) + 'px';
      el.style.opacity = '1';
      el.style.pointerEvents = 'none';
      el.style.transition = 'transform 2s ease-out, opacity 2s';
      el.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.22))';
      el.style.zIndex = 9999;

      const startRotation = Math.random() * 360;
      el.style.transform = `rotate(${startRotation}deg)`;
      document.body.appendChild(el);

      const x = (Math.random() - 0.5) * 140;
      const y = -120 - Math.random() * 100;
      const endRotation = startRotation + (Math.random() > 0.5 ? 180 : -180);

      requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px) rotate(${endRotation}deg) scale(1.15)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 2300 + Math.random() * 400);
    }
  }

  // === KEYBOARD SHORTCUTS ===
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    const isEditable =
      tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
    if (isEditable) return;

    const key = (e.key || '').toLowerCase();
    if (key === 'r') {
      showEmojis(['❤️', '💌', '🌹', '💫'], 8);
    } else if (key === 'c') {
      showEmojis(['🤎', '⭐️', '💐', '🌻'], 8);
    }
  });

  // === TURNTABLE SPINNING ===
  const music = document.getElementById('music');
  const record = document.querySelector('.record');

  if (music && record) {
    music.addEventListener('play', () => {
      record.style.animationPlayState = 'running';
    });
    music.addEventListener('pause', () => {
      record.style.animationPlayState = 'paused';
    });
    music.addEventListener('ended', () => {
      record.style.animationPlayState = 'paused';
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const turntable = document.querySelector('.turntable');
  const record = document.querySelector('.record');

  record.addEventListener('click', () => {
    // If it's not playing yet
    if (!turntable.classList.contains('playing')) {
      // Move the tonearm in
      turntable.classList.add('playing');

      // Start the record spinning slightly after the hand moves in
      setTimeout(() => {
        turntable.classList.add('spin');
      }, 800);
    } else {
      // Stop spinning first
      turntable.classList.remove('spin');

      // Wait a bit, then move the hand back out
      setTimeout(() => {
        turntable.classList.remove('playing');
      }, 500);
    }
  });
});

