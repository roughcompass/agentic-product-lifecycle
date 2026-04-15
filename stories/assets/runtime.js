/* ============================================================
 * story-weaver runtime
 * Scene tracking, progress, keyboard nav, dot navigation.
 * Exposes window.storyWeaver for story-specific JS.
 * ============================================================ */

(function () {
  'use strict';

  const doc = document;

  function init() {
    const scenes = Array.from(doc.querySelectorAll('[data-scene]'));
    if (scenes.length === 0) return;

    const progress = doc.querySelector('.story-progress');
    const dotsContainer = doc.querySelector('.story-dots');
    const chapterLabel = doc.querySelector('.story-chapter');

    // Build dot nav from scene count
    const dots = scenes.map((scene, i) => {
      const dot = doc.createElement('button');
      dot.className = 'story-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Scene ${i + 1}${scene.dataset.chapter ? ': ' + scene.dataset.chapter : ''}`);
      dot.addEventListener('click', () => {
        scene.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      if (dotsContainer) dotsContainer.appendChild(dot);
      return dot;
    });

    let currentIndex = 0;

    function setActive(index) {
      if (index < 0 || index >= scenes.length) return;
      currentIndex = index;

      scenes.forEach((scene, i) => {
        scene.classList.toggle('is-active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });

      if (progress) {
        const pct = (index + 1) / scenes.length;
        progress.style.setProperty('--progress', pct.toFixed(3));
      }

      if (chapterLabel) {
        const label = scenes[index].dataset.chapter;
        const num = String(index + 1).padStart(2, '0');
        const total = String(scenes.length).padStart(2, '0');
        chapterLabel.textContent = label
          ? `${num}/${total} · ${label}`
          : `${num}/${total}`;
      }

      scenes[index].dispatchEvent(
        new CustomEvent('scene:enter', { bubbles: true, detail: { index } })
      );
    }

    // Intersection observer — scene becomes active when it crosses 50%
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersectionRatio that is intersecting
        let bestEntry = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });
        if (bestEntry) {
          const index = scenes.indexOf(bestEntry.target);
          if (index !== -1 && index !== currentIndex) setActive(index);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-15% 0px -15% 0px' }
    );
    scenes.forEach((scene) => io.observe(scene));

    // Keyboard navigation
    doc.addEventListener('keydown', (e) => {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const next = () => {
        e.preventDefault();
        const t = scenes[Math.min(currentIndex + 1, scenes.length - 1)];
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      const prev = () => {
        e.preventDefault();
        const t = scenes[Math.max(currentIndex - 1, 0)];
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
        case 'PageDown':
          next(); break;
        case 'ArrowUp':
        case 'k':
        case 'PageUp':
          prev(); break;
        case ' ':
          e.shiftKey ? prev() : next(); break;
        case 'Home':
          e.preventDefault();
          scenes[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        case 'End':
          e.preventDefault();
          scenes[scenes.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
      }
    });

    // Expose story-specific API
    window.storyWeaver = {
      scenes,
      setActive,
      currentIndex: () => currentIndex,
      totalScenes: () => scenes.length,
      on: (sceneIndex, event, handler) => {
        scenes[sceneIndex]?.addEventListener(event, handler);
      }
    };

    // Prime the first scene immediately so it reveals without waiting for scroll
    requestAnimationFrame(() => setActive(0));
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
