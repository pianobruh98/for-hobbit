document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".hero-content h1");
  const subtitle = document.querySelector(".hero-content p");

  // Wrap words into spans, detect visual lines by measuring layout, and
  // apply animation delays per line so each line fades in together.
  const splitElementByLines = (element, baseDelay = 0, lineDelay = 0.35, wordStagger = 0.04) => {
    const wrapTextNode = (textNode) => {
      const text = textNode.textContent;
      const fragment = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      
      parts.forEach((part) => {
        if (part.trim() === "") {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.classList.add('char-reveal');
          span.style.display = 'inline-block';
          span.textContent = part;
          fragment.appendChild(span);
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    };

    const traverseAndWrap = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim().length > 0) wrapTextNode(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach((child) => traverseAndWrap(child));
      }
    };

    traverseAndWrap(element);

    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const spans = Array.from(element.querySelectorAll('.char-reveal'));
        if (!spans.length) return resolve(baseDelay);

        const lines = [];
        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const top = Math.round(rect.top);
          const existing = lines.find((l) => Math.abs(l.top - top) <= 2);
          if (existing) {
            existing.spans.push(span);
          } else {
            lines.push({ top, spans: [span] });
          }
        });

        lines.sort((a, b) => a.top - b.top);

        let currentDelay = baseDelay;
        lines.forEach((line) => {
          line.spans.forEach((span, i) => {
            span.style.animationDelay = `${currentDelay + i * wordStagger}s`;
          });
          currentDelay += lineDelay;
        });

        resolve(currentDelay);
      });
    });
  };

  if (title && subtitle) {
    splitElementByLines(title, 1.0, 0.45, 0.03).then((finish) => {
      splitElementByLines(subtitle, finish + 0.3, 0.35, 0.02);
    });
  }

  // Mobile-only: trigger one-time card zoom when cards scroll into view
  if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
    const mobileObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    document.querySelectorAll('.info-card').forEach((card) => mobileObserver.observe(card));
  }

  

  // Dropdown Menu Toggle Functionality
  const navToggle = document.getElementById("navToggle");
  const navDropdown = document.getElementById("navDropdown");

  if (navToggle && navDropdown) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navToggle.classList.toggle("active");
      navDropdown.classList.toggle("is-open");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove("active");
        navDropdown.classList.remove("is-open");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".hero-content h1");
  const subtitle = document.querySelector(".hero-content p");

  const splitElementByLines = (element, baseDelay = 0, lineDelay = 0.35, wordStagger = 0.04) => {
    const wrapTextNode = (textNode) => {
      const text = textNode.textContent;
      const fragment = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      
      parts.forEach((part) => {
        if (part.trim() === "") {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.classList.add('char-reveal');
          span.style.display = 'inline-block';
          span.textContent = part;
          fragment.appendChild(span);
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    };

    const traverseAndWrap = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim().length > 0) wrapTextNode(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach((child) => traverseAndWrap(child));
      }
    };

    traverseAndWrap(element);

    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const spans = Array.from(element.querySelectorAll('.char-reveal'));
        if (!spans.length) return resolve(baseDelay);

        const lines = [];
        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const top = Math.round(rect.top);
          const existing = lines.find((l) => Math.abs(l.top - top) <= 2);
          if (existing) {
            existing.spans.push(span);
          } else {
            lines.push({ top, spans: [span] });
          }
        });

        lines.sort((a, b) => a.top - b.top);

        let currentDelay = baseDelay;
        lines.forEach((line) => {
          line.spans.forEach((span, i) => {
            span.style.animationDelay = `${currentDelay + i * wordStagger}s`;
          });
          currentDelay += lineDelay;
        });

        resolve(currentDelay);
      });
    });
  };

  if (title && subtitle) {
    splitElementByLines(title, 1.0, 0.45, 0.03).then((finish) => {
      splitElementByLines(subtitle, finish + 0.3, 0.35, 0.02);
    });
  }

  if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
    const mobileObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    document.querySelectorAll('.info-card').forEach((card) => mobileObserver.observe(card));
  }

  const navToggle = document.getElementById("navToggle");
  const navDropdown = document.getElementById("navDropdown");

  if (navToggle && navDropdown) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navToggle.classList.toggle("active");
      navDropdown.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove("active");
        navDropdown.classList.remove("is-open");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navDropdown = document.getElementById("navDropdown");

  if (navToggle && navDropdown) {
    // Toggle mobile navigation menu
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navToggle.classList.toggle("active");
      navDropdown.classList.toggle("is-open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove("active");
        navDropdown.classList.remove("is-open");
      }
    });

    // Close menu when a navigation link is clicked
    const navLinks = navDropdown.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navDropdown.classList.remove("is-open");
      });
    });
  }

  // IntersectionObserver for mobile card scroll animations
  const cards = document.querySelectorAll(".info-card");
  if (cards.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));
  }
});