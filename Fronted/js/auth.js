/**
 * QuizVerse - Auth Module
 * JWT authentication, session management, and utilities
 */

// =========================================
// Token Management
// =========================================

const Auth = {
  TOKEN_KEY: 'quizverse_token',
  ADMIN_KEY: 'quizverse_admin',

  /**
   * Save token and admin data to localStorage
   */
  setSession(token, admin) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ADMIN_KEY, JSON.stringify(admin));
  },

  /**
   * Get stored JWT token
   */
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  },

  /**
   * Get stored admin profile
   */
  getAdmin() {
    try {
      const data = localStorage.getItem(this.ADMIN_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if admin is logged in (has valid token)
   */
  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT payload (base64) - client-side validity check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  },

  /**
   * Clear all auth data (logout)
   */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
    window.location.href = 'login.html';
  },

  /**
   * Guard: Redirect to login if not authenticated
   * Call this at the top of dashboard pages
   */
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  /**
   * Guard: Redirect to dashboard if already authenticated
   * Call this on login page
   */
  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = 'dashboard.html';
      return true;
    }
    return false;
  },
};

window.Auth = Auth;

// =========================================
// Toast Notification System
// =========================================

const Toast = {
  container: null,

  init() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    this.container = document.getElementById('toast-container');
  },

  show(message, type = 'info', title = null, duration = 4000) {
    if (!this.container) this.init();

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };

    const titles = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-title">${title || titles[type]}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    // Click to dismiss
    toast.addEventListener('click', () => this.dismiss(toast));

    this.container.appendChild(toast);

    // Auto-dismiss
    setTimeout(() => this.dismiss(toast), duration);
  },

  dismiss(toast) {
    if (!toast || toast.classList.contains('leaving')) return;
    toast.classList.add('leaving');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  },

  success: (msg, title) => Toast.show(msg, 'success', title),
  error: (msg, title) => Toast.show(msg, 'error', title),
  warning: (msg, title) => Toast.show(msg, 'warning', title),
  info: (msg, title) => Toast.show(msg, 'info', title),
};

// Make Toast methods callable directly
['success', 'error', 'warning', 'info'].forEach(type => {
  Toast[type] = (msg, title) => Toast.show(msg, type, title);
});

window.Toast = Toast;
Toast.init();

// =========================================
// Loading Screen
// =========================================

const LoadingScreen = {
  show() {
    const el = document.getElementById('loading-screen');
    if (el) {
      el.classList.remove('hidden');
    }
  },

  hide(delay = 500) {
    setTimeout(() => {
      const el = document.getElementById('loading-screen');
      if (el) el.classList.add('hidden');
    }, delay);
  },
};

window.LoadingScreen = LoadingScreen;

// =========================================
// Particle Background System
// =========================================

const ParticleSystem = {
  canvas: null,
  ctx: null,
  particles: [],
  animationId: null,

  init(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
      document.body.prepend(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles(80);
    this.animate();

    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5 ? '0, 229, 255' : '139, 92, 246',
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const time = Date.now() * 0.001;

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulsePhase += p.pulseSpeed;

      // Wrap around
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const opacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulsePhase));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
      this.ctx.fill();
    });

    // Draw connections
    this.drawConnections();

    this.animationId = requestAnimationFrame(() => this.animate());
  },

  drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  },

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  },
};

window.ParticleSystem = ParticleSystem;

// =========================================
// Confetti System
// =========================================

const Confetti = {
  active: false,
  pieces: [],
  animationId: null,

  launch(duration = 5000) {
    const colors = ['#00E5FF', '#8B5CF6', '#FF4D6D', '#10B981', '#F59E0B', '#FFFFFF'];
    
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
          left: ${Math.random() * 100}vw;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          animation-duration: ${Math.random() * 3 + 2}s;
          animation-delay: ${Math.random() * 2}s;
          opacity: ${Math.random() * 0.8 + 0.2};
        `;
        document.body.appendChild(piece);

        setTimeout(() => {
          if (piece.parentNode) piece.parentNode.removeChild(piece);
        }, 6000);
      }, i * 30);
    }
  },
};

window.Confetti = Confetti;

// =========================================
// Counter Animation
// =========================================

const CounterAnimation = {
  animate(element, target, duration = 1500, prefix = '', suffix = '') {
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      
      element.textContent = prefix + current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = prefix + target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(update);
  },
};

window.CounterAnimation = CounterAnimation;

// =========================================
// Scroll-triggered Animations (Simple AOS)
// =========================================

const ScrollReveal = {
  init() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  },
};

window.ScrollReveal = ScrollReveal;

// =========================================
// Offline Detection
// =========================================
window.addEventListener('online', () => {
  Toast.success('Connection restored! You are back online.', '🌐 Connected');
});

window.addEventListener('offline', () => {
  Toast.warning('You are offline. Some features may not work.', '📡 Offline');
});

// =========================================
// Format Helpers
// =========================================

const Format = {
  time(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  },

  percentage(value, total) {
    if (!total) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  },

  date(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  dateTime(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  initials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  },

  gradeColor(grade) {
    const colors = { S: '#FFD700', A: '#00E5FF', B: '#10B981', C: '#F59E0B', D: '#8B5CF6', F: '#FF4D6D' };
    return colors[grade] || '#ffffff';
  },
};

window.Format = Format;

// =========================================
// Circular Progress Renderer
// =========================================

function renderCircularProgress(element, percentage, color = '#00E5FF', size = 160, stroke = 10) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  element.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
      <circle class="track" cx="${size/2}" cy="${size/2}" r="${radius}" 
        fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="${stroke}"/>
      <circle class="fill" cx="${size/2}" cy="${size/2}" r="${radius}"
        fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference}"
        style="filter: drop-shadow(0 0 8px ${color}); transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);"
      />
    </svg>
    <div class="label" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:${size * 0.2}px;font-weight:800;color:${color};">${percentage}%</div>
      <div style="font-size:${size * 0.08}px;color:rgba(255,255,255,0.5);margin-top:2px;">Score</div>
    </div>
  `;

  element.style.position = 'relative';
  element.style.display = 'inline-block';

  // Animate after render
  setTimeout(() => {
    const fillEl = element.querySelector('.fill');
    if (fillEl) fillEl.style.strokeDashoffset = offset;
  }, 100);
}

window.renderCircularProgress = renderCircularProgress;
