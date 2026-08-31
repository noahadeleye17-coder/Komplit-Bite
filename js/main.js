// ============ Footer year ============
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ 360 product spinner ============
// Drag left/right to "rotate" the product. Pass multiple frame images via the
// data-frames attribute (a JSON array of image paths, ordered around the turn)
// to get a true frame-by-frame 360 spin. With a single frame (the current
// default, since we only have one clean product photo to work with) it falls
// back to a light tilt/parallax so the interaction still feels alive — swap
// in a real photo sequence any time and the spin will pick it up automatically.
document.querySelectorAll('[data-spinner]').forEach((spinner) => {
  const img = spinner.querySelector('[data-spinner-img]');
  const hint = spinner.querySelector('[data-spinner-hint]');
  let frames = [];
  try {
    frames = JSON.parse(spinner.dataset.frames || '[]');
  } catch (e) {
    frames = [];
  }

  let dragging = false;
  let startX = 0;
  let currentFrame = 0;
  const degreesPerFrame = frames.length > 1 ? 360 / frames.length : 0;

  const setFrameFromDelta = (deltaX) => {
    if (frames.length > 1) {
      const framesMoved = Math.round(deltaX / 12);
      let idx = (currentFrame + framesMoved) % frames.length;
      if (idx < 0) idx += frames.length;
      img.src = frames[idx];
    } else {
      // Single-frame fallback: subtle 3D tilt to hint at rotation.
      const tilt = Math.max(-14, Math.min(14, deltaX / 8));
      img.style.transform = `perspective(600px) rotateY(${tilt}deg)`;
    }
  };

  const start = (x) => {
    dragging = true;
    startX = x;
    if (hint) hint.classList.add('is-hidden');
    spinner.style.cursor = 'grabbing';
  };
  const move = (x) => {
    if (!dragging) return;
    setFrameFromDelta(x - startX);
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    spinner.style.cursor = 'grab';
    if (frames.length <= 1) {
      img.style.transform = '';
    }
  };

  spinner.addEventListener('pointerdown', (e) => start(e.clientX));
  window.addEventListener('pointermove', (e) => move(e.clientX));
  window.addEventListener('pointerup', end);
  spinner.addEventListener('pointerleave', end);
});

// ============ Reviews carousel ============
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      timer = setInterval(() => goTo(index + 1), 6000);
    }
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  render();
  resetTimer();
});

// ============ Contact form (mailto handoff) ============
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const message = contactForm.message.value.trim();
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:hello@komplitbite.example?subject=${subject}&body=${body}`;
    const note = contactForm.querySelector('[data-form-note]');
    if (note) note.hidden = false;
  });
}
