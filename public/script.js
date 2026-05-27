// ======================================
//   AYUSH PORTFOLIO — script.js
// ======================================

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', stored);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let fX = 0, fY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    fX += (mouseX - fX) * 0.12;
    fY += (mouseY - fY) * 0.12;
    follower.style.left = fX + 'px';
    follower.style.top  = fY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor expansion on interactive elements
  const interactives = 'a, button, .skill-group, .project-card, .timeline-card, .info-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.matches(interactives) || e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.opacity = '0.2';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.matches(interactives) || e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.opacity = '0.5';
    }
  });

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ---- HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // ---- PAGE TURN NAVIGATION ----
  const overlay = document.getElementById('pageTurnOverlay');
  const sections = document.querySelectorAll('.section');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function navigateTo(targetId) {
  const current = document.querySelector('.section.active');
  const target = document.getElementById(targetId);

  if (!target || current === target) return;

  history.replaceState(null, '', '#' + targetId);

    // Trigger page turn
    overlay.classList.add('turning');

    setTimeout(() => {
      current.classList.remove('active');
      target.classList.add('active');

      // Update nav active
      navLinkEls.forEach(l => {
        l.classList.toggle('active', l.dataset.section === targetId);
      });

      // Scroll to top
      window.scrollTo({  top: 0,
  behavior: 'smooth' });

      // Animate timeline bars on education
      if (targetId === 'education') animateBars();

    }, 300);

    setTimeout(() => {
      overlay.classList.remove('turning');
    }, 650);

    // Close mobile menu
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }

  // Nav link clicks
  navLinkEls.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });

  // Inline nav-trigger links (e.g. hero Contact Me)
  document.querySelectorAll('.nav-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const section = el.dataset.section || el.getAttribute('href').replace('#', '');
      navigateTo(section);
    });
  });

  // Hash links in general
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(id);
    if (target && target.classList.contains('section')) {
      e.preventDefault();
      navigateTo(id);
    }
  });

  // ---- ROLE TYPER ----
  const roles = [
    'IT Graduate',
    'Web Developer',
    'Node.js Developer',
    'Networking Enthusiast',
    'Cybersecurity Learner',
  ];
  const roleEl = document.getElementById('roleText');
  if (roleEl) {
    let ri = 0, ci = 0, deleting = false;
    function typeRole() {
      const word = roles[ri];
      if (!deleting) {
        roleEl.textContent = word.slice(0, ci + 1);
        ci++;
        if (ci === word.length) { deleting = true; setTimeout(typeRole, 1800); return; }
        setTimeout(typeRole, 90);
      } else {
        roleEl.textContent = word.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeRole, 400); return; }
        setTimeout(typeRole, 50);
      }
    }
    setTimeout(typeRole, 800);
  }

  // ---- TIMELINE BARS (animate on section enter) ----
  function animateBars() {
    document.querySelectorAll('.tl-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = w; });
      });
    });
  }

  // ---- STAGGERED CARD ANIMATION ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function initAnimations() {
    document.querySelectorAll('[data-delay]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
  initAnimations();

  // Re-init animations when section changes (since sections are hidden/shown)
  const sectionObserver = new MutationObserver(() => initAnimations());
  sections.forEach(s => sectionObserver.observe(s, { attributes: true, attributeFilter: ['class'] }));

  // ---- INITIAL ACTIVE SECTION FROM HASH ----
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    document.querySelectorAll('.section.active').forEach(s => s.classList.remove('active'));
    document.getElementById(hash).classList.add('active');
    navLinkEls.forEach(l => l.classList.toggle('active', l.dataset.section === hash));
  }

  console.log('%c✦ Ayush B. Patra Portfolio', 'color:#00d4ff;font-family:monospace;font-size:16px;font-weight:bold;');
  console.log('%cBuilt with HTML + CSS + JS + React', 'color:#9aa5c4;font-family:monospace;');

})();


const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        alert("Please fill all fields.");
        return;

    }

    try {

        const response = await fetch("/send-email", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("✅ Message sent successfully!");

            form.reset();

        }

        else {

            alert("❌ Failed to send message.");

        }

    }

    catch (error) {

        console.log(error);

        alert("❌ Server Error");

    }

});