/* ==========================================================================
   Jordan Reyes — Portfolio Script (Updated for Rey Kristian Aure)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */
  const skills = [
    { code: 'JS', name: 'JavaScript', desc: 'ES6+, async patterns, DOM & browser APIs', level: 92 },
    { code: 'PY', name: 'Python', desc: 'Data structures, scripting, ML tooling', level: 90 },
    { code: 'RE', name: 'React', desc: 'Hooks, state management, component design', level: 85 },
    { code: 'JV', name: 'Java', desc: 'OOP, Spring basics, algorithms coursework', level: 80 },
    { code: 'SQ', name: 'SQL', desc: 'Schema design, joins, query optimization', level: 83 },
    { code: 'GT', name: 'Git', desc: 'Branching workflows, code review, CI basics', level: 88 },
    { code: 'CN', name: 'Cloud', desc: 'AWS fundamentals, deployment, containers', level: 75 },
  ];

  const certificates = [
    { badge: 'JHS', title: 'Naga City Science High School', issuer: 'Junior High School', year: '2018 - 2022' },
    { badge: 'SHS', title: 'University Of Nueva Caceres', issuer: 'Senior High School | TVL - Computer Programming', year: '2022 - 2024' },
    { badge: 'COL', title: 'Bicol University', issuer: 'College', year: '2024 - current' },
    { badge: 'AWS', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025' },
    { badge: 'ML', title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI · Coursera', year: '2024' },
    { badge: 'DS', title: 'Data Structures & Algorithms', issuer: 'University Coursework', year: '2024' },
    { badge: 'FS', title: 'Full-Stack Web Development', issuer: 'freeCodeCamp', year: '2023' },
  ];

  const projects = [
    {
      tag: '01',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      name: 'TaskFlow — Team Planner',
      desc: 'A collaborative task manager with real-time boards, role-based permissions, and activity timelines.',
    },
    {
      tag: '02',
      tags: ['Python', 'TensorFlow', 'Flask'],
      name: 'Campus Sentiment Analyzer',
      desc: 'NLP pipeline that classifies student feedback and surfaces trends through a lightweight dashboard.',
    },
    {
      tag: '03',
      tags: ['Java', 'Spring Boot', 'MySQL'],
      name: 'LibrarySys',
      desc: 'A full inventory and lending system for a university library, built for a databases capstone.',
    },
    {
      tag: '04',
      tags: ['JavaScript', 'Three.js'],
      name: 'Orbit — 3D Visualizer',
      desc: 'An interactive WebGL scene visualizing sorting algorithms as orbital motion.',
    },
  ];

  /* ------------------------------------------------------------------
     Render: Skills carousel
     ------------------------------------------------------------------ */
  const stage = document.getElementById('carouselStage');
  const dotsWrap = document.getElementById('carouselDots');
  let activeIndex = 0;

  skills.forEach((s) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-card-inner">
        <div class="skill-icon">${s.code}</div>
        <div class="skill-name">${s.name}</div>
        <p class="skill-desc">${s.desc}</p>
        <div class="skill-level"><div class="skill-level-fill" style="width:${s.level}%"></div></div>
      </div>
    `;
    stage.appendChild(card);
  });

  skills.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => { activeIndex = i; renderCarousel(); });
    dotsWrap.appendChild(dot);
  });

  const cards = Array.from(stage.children);
  const dots = Array.from(dotsWrap.children);

  function renderCarousel(){
    const n = cards.length;
    cards.forEach((card, i) => {
      const offset = (i - activeIndex + n) % n;
      let pos;
      if (offset === 0) pos = 'center';
      else if (offset === 1) pos = 'right';
      else if (offset === n - 1) pos = 'left';
      else if (offset === 2) pos = 'farright';
      else if (offset === n - 2) pos = 'farleft';
      else pos = 'hidden';
      card.dataset.pos = pos;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % cards.length;
    renderCarousel();
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    renderCarousel();
  });

  renderCarousel();

  /* ------------------------------------------------------------------
     Render: Education & Certificates
     ------------------------------------------------------------------ */
  const certGrid = document.getElementById('certGrid');
  certificates.forEach((c) => {
    const el = document.createElement('div');
    el.className = 'cert-card';
    el.innerHTML = `
      <div class="cert-top">
        <div class="cert-badge">${c.badge}</div>
        <span class="cert-year">${c.year}</span>
      </div>
      <div class="cert-title">${c.title}</div>
      <div class="cert-issuer">${c.issuer}</div>
    `;
    certGrid.appendChild(el);
  });

  /* ------------------------------------------------------------------
     Render: Projects
     ------------------------------------------------------------------ */
  const projectGrid = document.getElementById('projectGrid');
  projects.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'project-card';
    el.innerHTML = `
      <div class="project-media" data-tag="${p.tag}"></div>
      <div class="project-body">
        <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-name">${p.name}</div>
        <p class="project-desc">${p.desc}</p>
        <a href="#" class="project-link">View case study →</a>
      </div>
    `;
    projectGrid.appendChild(el);
  });

  /* ------------------------------------------------------------------
     Custom cursor
     ------------------------------------------------------------------ */
  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');

  if (window.matchMedia('(pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing(){
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  } else {
    ring.style.display = 'none';
    dot.style.display = 'none';
  }

  /* ------------------------------------------------------------------
     Navbar scroll state + active link
     ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    let currentId = 'home';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
    });
  });

  /* ------------------------------------------------------------------
     Hamburger / mobile menu
     ------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ------------------------------------------------------------------
     Theme toggle (light / dark state management)
     ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  /* ------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

});