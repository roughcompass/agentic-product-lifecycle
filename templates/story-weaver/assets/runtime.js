/* ============================================================
 * story-weaver runtime
 * Scene tracking, progress, keyboard nav, dot navigation.
 * Exposes window.storyWeaver for story-specific JS.
 * ============================================================ */

(function () {
  'use strict';

  var doc = document;

  function init() {
    var scenes = Array.from(doc.querySelectorAll('[data-scene]'));
    if (scenes.length === 0) return;

    var progress = doc.querySelector('.story-progress');
    var dotsContainer = doc.querySelector('.story-dots');
    var chapterLabel = doc.querySelector('.story-chapter');

    // Build dot nav from scene count
    var dots = scenes.map(function (scene, i) {
      var dot = doc.createElement('button');
      dot.className = 'story-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Scene ' + (i + 1) + (scene.dataset.chapter ? ': ' + scene.dataset.chapter : ''));
      dot.addEventListener('click', function () {
        scene.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      if (dotsContainer) dotsContainer.appendChild(dot);
      return dot;
    });

    var currentIndex = 0;

    function setActive(index) {
      if (index < 0 || index >= scenes.length) return;
      currentIndex = index;

      scenes.forEach(function (scene, i) {
        scene.classList.toggle('is-active', i === index);
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });

      if (progress) {
        var pct = (index + 1) / scenes.length;
        progress.style.setProperty('--progress', pct.toFixed(3));
      }

      if (chapterLabel) {
        var label = scenes[index].dataset.chapter;
        var num = String(index + 1).padStart(2, '0');
        var total = String(scenes.length).padStart(2, '0');
        chapterLabel.textContent = label
          ? num + '/' + total + ' \u00b7 ' + label
          : num + '/' + total;
      }

      scenes[index].dispatchEvent(
        new CustomEvent('scene:enter', { bubbles: true, detail: { index: index } })
      );
    }

    // Intersection observer — scene becomes active when it crosses threshold
    var io = new IntersectionObserver(
      function (entries) {
        var bestEntry = null;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });
        if (bestEntry) {
          var index = scenes.indexOf(bestEntry.target);
          if (index !== -1 && index !== currentIndex) setActive(index);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-15% 0px -15% 0px' }
    );
    scenes.forEach(function (scene) { io.observe(scene); });

    // Keyboard navigation
    doc.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      var goNext = function () {
        e.preventDefault();
        var t = scenes[Math.min(currentIndex + 1, scenes.length - 1)];
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      var goPrev = function () {
        e.preventDefault();
        var t = scenes[Math.max(currentIndex - 1, 0)];
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
        case 'PageDown':
          goNext(); break;
        case 'ArrowUp':
        case 'k':
        case 'PageUp':
          goPrev(); break;
        case ' ':
          e.shiftKey ? goPrev() : goNext(); break;
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
      scenes: scenes,
      setActive: setActive,
      currentIndex: function () { return currentIndex; },
      totalScenes: function () { return scenes.length; },
      on: function (sceneIndex, event, handler) {
        if (scenes[sceneIndex]) scenes[sceneIndex].addEventListener(event, handler);
      }
    };

    // Prime the first scene immediately
    requestAnimationFrame(function () { setActive(0); });
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
