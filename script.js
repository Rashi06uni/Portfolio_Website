// Animate the accent underline on the title span
document.addEventListener('DOMContentLoaded', () => {
  const span = document.querySelector('.hero-title span');
  if (span) {
    // Small delay so the CSS transition is visible on load
    setTimeout(() => span.classList.add('animate'), 300);
  }

  // Subtle parallax on the blobs
  document.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 20;
    const y = (e.clientY / h - 0.5) * 20;

    document.querySelector('.blob-1').style.transform =
      `translate(${x * 0.8}px, ${y * 0.8}px)`;
    document.querySelector('.blob-2').style.transform =
      `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
  });

  // Entrance animation: fade + slide up the hero card
  const heroCard = document.querySelector('.hero-inner');
  heroCard.style.opacity = '0';
  heroCard.style.transform = 'translateY(30px)';
  heroCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroCard.style.opacity = '1';
      heroCard.style.transform = 'translateY(0)';
    });
  });

  // Staggered entrance for identity cards
  const idCards = document.querySelectorAll('.id-card');
  idCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.index) * 120;
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  idCards.forEach((card) => observer.observe(card));

  // ── Skills: orbit positioning + float animation ──
  initSkills();

  // ── Footer: dynamic year ──
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Projects: staggered scroll entrance ──
  const projCards = document.querySelectorAll('.proj-card');
  projCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
  });

  const projObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.index) * 130;
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, delay);
        projObserver.unobserve(card);
      }
    });
  }, { threshold: 0.12 });

  projCards.forEach((card) => projObserver.observe(card));

  // ── Education: staggered timeline scroll entrance ──
  const tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-24px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = parseInt(item.dataset.index) * 150;
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, delay);
        tlObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15 });

  tlItems.forEach((item) => tlObserver.observe(item));

  // ── Wrestling section: split entrance ──
  const wrestlingImg = document.querySelector('.wrestling-image-wrap');
  const wrestlingContent = document.querySelector('.wrestling-content');

  if (wrestlingImg && wrestlingContent) {
    wrestlingImg.style.opacity = '0';
    wrestlingImg.style.transform = 'translateX(-40px)';
    wrestlingImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    wrestlingContent.style.opacity = '0';
    wrestlingContent.style.transform = 'translateX(40px)';
    wrestlingContent.style.transition = 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s';

    const wObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          wrestlingImg.style.opacity = '1';
          wrestlingImg.style.transform = 'translateX(0)';
          wrestlingContent.style.opacity = '1';
          wrestlingContent.style.transform = 'translateX(0)';
          wObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    wObserver.observe(document.querySelector('.wrestling-section'));
  }
});

function initSkills() {
  const wrapper = document.querySelector('.skills-wrapper');
  if (!wrapper) return;

  // Draw orbit ring
  const orbit = document.createElement('div');
  orbit.className = 'skills-orbit';
  const orbitSize = wrapper.offsetWidth * 0.82;
  orbit.style.width  = orbitSize + 'px';
  orbit.style.height = orbitSize + 'px';
  wrapper.appendChild(orbit);

  const chips = wrapper.querySelectorAll('.skill-chip');
  const cx = wrapper.offsetWidth  / 2;
  const cy = wrapper.offsetHeight / 2;
  const r  = orbitSize / 2;
  const total = chips.length;

  chips.forEach((chip, i) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    const x = cx + r * Math.cos(angle) - chip.offsetWidth  / 2;
    const y = cy + r * Math.sin(angle) - chip.offsetHeight / 2;

    chip.style.left = x + 'px';
    chip.style.top  = y + 'px';

    const delay = (i * (3000 / total)).toFixed(0) + 'ms';
    chip.style.animation = `floatChip 3s ease-in-out ${delay} infinite`;

    chip.style.opacity = '0';
    chip.style.transition = 'opacity 0.5s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease';
    setTimeout(() => { chip.style.opacity = '1'; }, 400 + i * 100);
  });
}
