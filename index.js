// ==========================================
// 1. Theme Management (Dark/Light Mode)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
  let theme = 'dark';
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    theme = 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

// ==========================================
// 2. Header Scroll Effect & Navigation Link Highlight
// ==========================================
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Toggle Header Scroll Shadow
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Active Link Highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// ==========================================
// 3. Mobile Navigation Menu Toggle
// ==========================================
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  if (navLinksContainer.classList.contains('active')) {
    icon.className = 'fa-solid fa-xmark';
  } else {
    icon.className = 'fa-solid fa-bars';
  }
});

// Close Mobile Nav on click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
  });
});

// ==========================================
// 4. Hero Background Particle Network Canvas
// ==========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
const connectionDistance = 120;

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
  }

  draw() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(99, 102, 241, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Draw network connection lines
    for (let j = i + 1; j < particles.length; j++) {
      const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (dist < connectionDistance) {
        const opacity = (1 - dist / connectionDistance) * 0.15;
        ctx.strokeStyle = isDark 
          ? `rgba(0, 240, 255, ${opacity})` 
          : `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// 5. Hero Subtitle Typing Animation Effect
// ==========================================
const typedTextSpan = document.getElementById('typed-text');
const textArray = ["a Full Stack Developer.", "a Cybersecurity Student.", "a Problem Solver.", "a Secure Architect."];
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    typedTextSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    typedTextSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingSpeed + 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay);
});

// ==========================================
// 6. Skills Animation (Intersection Observer)
// ==========================================
const skillBars = document.querySelectorAll('.skill-bar');
const skillsSection = document.getElementById('skills');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ==========================================
// 7. Interactive Cybersecurity Terminal Shell
// ==========================================
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');
const terminalBody = document.getElementById('terminal-body');

const commands = {
  help: `Available operations:
  about     - Output a biography summary
  skills    - List core tech stack and language systems
  projects  - Show detailed project descriptions
  socials   - Retrieve active secure social channels
  clear     - Empty screen buffer
  banner    - Print system ASCII branding`,
  
  about: `Biography:
  Mohammed Riad is a passionate Cybersecurity Student & Full Stack Developer.
  Specializes in constructing robust applications and implementing strict 
  defensive secure principles. Current focus: developing zero-trust APIs, 
  network auditing, and optimizing system architectures.`,
  
  skills: `Core Capabilities:
  - Frontend Development: React.js, Next.js, HTML5, CSS3, ES6+ JavaScript.
  - Backend Development: Node.js, Python, Java, C, C++, PHP, AssemblyScript.
  - Databases: MySQL, Relational Design, Query Optimization.
  - Networking & Infrastructure: Cisco Networking, Git/GitHub VC.
  - Digital Media: Canva & Adobe Creative Suites.
  - Languages: Arabic (Native), English (Fluent), French (Fluent).`,
  
  projects: `Selected Project Repositories:
  [1] SecureAuth API Engine (Full Stack Development)
      A zero-trust token auth system using AES-256 and salted crypt hashes.
  [2] Sentinel Web Auditor (Cybersecurity Development)
      Vulnerability audit scanner parsing secure headers and port statuses.
  [3] NetGuard Node Dashboard (Network Security Visualization)
      A visual map layout overlaying packets, router ports, and logs.
  
  Type command 'projects' or click cards in the page below for deep specs.`,
  
  socials: `External Communications:
  - LinkedIn: https://linkedin.com/in/Ouar-Mohamed-Riad
  - GitHub:   https://github.com/riad-18
  - Email:    mailto:riad79832@gmail.com`,
  
  banner: `  _____  _____            _____    _____ _    _ ______ _      _      
 |  __ \|_   _|   /\   |  __ \    / ____| |  | |  ____| |    | |     
 | |__) | | |    /  \  | |  | |   | |    | |__| | |__  | |    | |     
 |  _  /  | |   / /\ \ | |  | |   | |    |  __  |  __| | |    | |     
 | | \ \ _| |_ / ____ \| |__| |   | |____| |  | | |____| |____| |____ 
 |_|  \_\_____/_/    \_\_____/     \_____|_|  |_|______|______|______|`
};

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    
    // Command line prompt log line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `
      <span class="terminal-prompt-label">guest@riad-portfolio</span> 
      <span class="terminal-prompt-path">~</span> 
      <span class="terminal-prompt-label">$</span> 
      <span class="terminal-output-command">${input}</span>
    `;
    terminalHistory.appendChild(cmdLine);

    if (input) {
      const outputLine = document.createElement('div');
      outputLine.className = 'terminal-output';

      if (input === 'clear') {
        terminalHistory.innerHTML = '';
      } else if (commands[input]) {
        outputLine.textContent = commands[input];
        terminalHistory.appendChild(outputLine);
      } else if (input === 'hack' || input === 'sudo') {
        outputLine.textContent = "Access Denied. Intrusion attempt logged. Target system locked.";
        outputLine.style.color = '#ef4444';
        terminalHistory.appendChild(outputLine);
        showToast("Intrusion attempt blocked!", "fa-solid fa-triangle-exclamation", "#ef4444");
      } else {
        outputLine.textContent = `Command not recognized: '${input}'. Type 'help' to see valid operations.`;
        terminalHistory.appendChild(outputLine);
      }
    }
    
    // Scroll terminal to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// Shortcut clicking handler
window.runShortcut = function(cmd) {
  terminalInput.value = cmd;
  terminalInput.focus();
  const event = new KeyboardEvent('keydown', { key: 'Enter' });
  terminalInput.dispatchEvent(event);
};

// ==========================================
// 8. Projects Portfolio Category Filtering
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ==========================================
// 9. Projects Details Dialog / Modal Handler
// ==========================================
const projectData = {
  secureauth: {
    title: "SecureAuth API Engine",
    tag: "Full Stack Development & Security",
    image: "./assets/project1.webp",
    desc: "SecureAuth is a production-hardened RESTful authentication backend designed to resist typical API security failures (broken object-level authorization, credential stuffing, and injection flaws). Built using Node.js, it leverages strict schema validations and standard cryptographical standards to enforce secure communications.",
    features: [
      "Access token issuance via signed RS256 JWT keypairs",
      "Dynamic rate limiting on auth routes via memory tokens",
      "Password hashing using Argon2id with random crypt salting",
      "Comprehensive database input scrubbing protecting MySQL structures",
      "Security audit logs recording failed authentication vectors"
    ],
    tech: ["Node.js", "Express", "MySQL", "JWT", "Argon2", "Helmet.js"],
    demo: "#",
    repo: "https://github.com/riad-18"
  },
  sentinel: {
    title: "Sentinel Web Auditor",
    tag: "Cybersecurity Development",
    image: "./assets/project2.webp",
    desc: "Sentinel is an automated reconnaissance and auditing tool mapping public web endpoints. The utility executes targeted testing routines based on standard OWASP guides, highlighting misconfigurations in TLS configurations, security headers, and common SQL/XSS deployment parameters.",
    features: [
      "Simulated dictionary checks highlighting subdirectories and files",
      "Inspection of TLS/SSL certificate ciphers and flags",
      "Passive scan check verify: X-Frame-Options, CSP, HSTS headers",
      "Active validation check assessing simple SQLi payloads in forms",
      "Report generation outputting HTML or raw JSON logs"
    ],
    tech: ["Python", "C++", "Sockets", "RegEx", "OpenSSL", "Requests"],
    demo: "#",
    repo: "https://github.com/riad-18"
  },
  netguard: {
    title: "NetGuard Node Dashboard",
    tag: "Network Traffic Security UI",
    image: "./assets/project3.webp",
    desc: "NetGuard serves as a graphical overlay dashboard showing LAN network configurations. Parsing raw socket packet streams, this tool maps connected hosts, categorizes protocols in use, and triggers visual warning highlights upon detection of unauthorized port requests or suspicious payloads.",
    features: [
      "Graphical tree mapping displaying router connections and active nodes",
      "Real-time chart graphs showing current packet rates and categories",
      "Syslog parsing engine categorizing logs by RFC levels",
      "Firewall rule adjustment integration directly using simple API posts",
      "Integrated packet capture search filtering specific protocols"
    ],
    tech: ["React.js", "Node.js", "D3.js", "Cisco IOS", "WebSockets", "Pcap"],
    demo: "#",
    repo: "https://github.com/riad-18"
  }
};

const modalOverlay = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTag = document.getElementById('modal-tag');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalFeaturesList = document.getElementById('modal-features-list');
const modalTechList = document.getElementById('modal-tech-list');
const modalLinkDemo = document.getElementById('modal-link-demo');
const modalLinkRepo = document.getElementById('modal-link-repo');

window.openProjectModal = function(id) {
  const data = projectData[id];
  if (!data) return;
  
  modalImg.src = data.image;
  modalImg.alt = data.title;
  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  
  // Clear lists
  modalFeaturesList.innerHTML = '';
  modalTechList.innerHTML = '';
  
  // Populate features
  data.features.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    modalFeaturesList.appendChild(li);
  });
  
  // Populate tech badges
  data.tech.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tech-badge';
    span.textContent = t;
    modalTechList.appendChild(span);
  });
  
  modalLinkDemo.href = data.demo;
  modalLinkRepo.href = data.repo;
  
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function(e) {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

// ==========================================
// 10. Form Submission Simulation & Integrity check
// ==========================================
const contactForm = document.getElementById('contact-form');
const sendingIndicator = document.getElementById('sending-indicator');
const sendingStatus = document.getElementById('sending-status');
const sendingPct = document.getElementById('sending-pct');
const progressFill = document.getElementById('sending-progress-fill');

window.handleContactSubmit = function(e) {
  e.preventDefault();
  
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const message = document.getElementById('form-message').value;
  
  if (!name || !email || !message) return;
  
  // Block multiple submissions, start visual sending
  contactForm.querySelector('button[type="submit"]').style.display = 'none';
  sendingIndicator.style.display = 'flex';
  
  const steps = [
    { p: 15, text: "Sanitizing message inputs..." },
    { p: 40, text: "Establishing secure TLS connection..." },
    { p: 70, text: "Applying AES key rotation..." },
    { p: 90, text: "Sending payload logs to core database..." },
    { p: 100, text: "Transmission Verified!" }
  ];
  
  let currentStep = 0;
  
  function updateProgress() {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      sendingStatus.textContent = step.text;
      sendingPct.textContent = `${step.p}%`;
      progressFill.style.width = `${step.p}%`;
      
      currentStep++;
      setTimeout(updateProgress, 600);
    } else {
      // Completed sending
      setTimeout(() => {
        // Reset indicator
        sendingIndicator.style.display = 'none';
        progressFill.style.width = '0%';
        contactForm.querySelector('button[type="submit"]').style.display = 'block';
        contactForm.reset();
        
        // Success Toast popup
        showToast("Transmission complete! Message delivered.", "fa-solid fa-circle-check", "#10b981");
      }, 500);
    }
  }
  
  updateProgress();
};

// ==========================================
// 11. Toast Notifications Utility
// ==========================================
function showToast(message, iconClass, bgColor) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.background = bgColor || 'var(--accent-cyan)';
  
  toast.innerHTML = `
    <i class="${iconClass || 'fa-solid fa-info'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger active anim
  setTimeout(() => toast.classList.add('active'), 50);
  
  // Destroy after 4 seconds
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
