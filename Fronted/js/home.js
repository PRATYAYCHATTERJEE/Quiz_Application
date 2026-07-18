/**
 * QuizVerse - Home Page JavaScript
 * Landing page animations, GSAP reveals, and navigation
 */

document.addEventListener('DOMContentLoaded', async () => {
  // =========================================
  // Initialize
  // =========================================
  LoadingScreen.hide(800);
  ParticleSystem.init('particle-canvas');
  ScrollReveal.init();
  initNavbar();
  initHeroAnimations();
  initCounters();
  initQuizStatus();

  // =========================================
  // Navbar Scroll Effect
  // =========================================
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // =========================================
  // Hero GSAP Animations
  // =========================================
  function initHeroAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('.hero-label, .hero-title, .hero-description, .hero-cta, .hero-stats').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // GSAP Timeline for hero reveal
    const tl = gsap.timeline({ delay: 0.8 });

    tl.from('.hero-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .from('.hero-title .word', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-description', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .from('.hero-cta .btn', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-stat', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.2');

    // Floating cards animation
    gsap.to('.floating-card-main', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Scroll-triggered feature cards
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.step-item', {
        scrollTrigger: {
          trigger: '.steps-timeline',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }
  }

  // =========================================
  // Animated Counters
  // =========================================
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-counter'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          CounterAnimation.animate(entry.target, target, 1500, '', suffix);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // =========================================
  // Check Quiz Status
  // =========================================
  async function initQuizStatus() {
    const liveSection = document.getElementById('live-quiz-section');
    const noQuizSection = document.getElementById('no-quiz-section');
    
    try {
      const data = await QuizAPI.getActive();
      
      if (data.success && data.data.quiz) {
        const quiz = data.data.quiz;
        
        // Show live section
        if (liveSection) liveSection.classList.remove('hidden');
        if (noQuizSection) noQuizSection.classList.add('hidden');

        // Populate quiz info
        updateElement('quiz-title-display', quiz.title);
        updateElement('quiz-duration-display', Format.time(quiz.duration));
        updateElement('quiz-questions-display', quiz.totalQuestions);
        updateElement('quiz-category-display', quiz.category);
        updateElement('quiz-difficulty-display', quiz.difficulty);
      } else {
        if (liveSection) liveSection.classList.add('hidden');
        if (noQuizSection) noQuizSection.classList.remove('hidden');
      }
    } catch (error) {
      if (liveSection) liveSection.classList.add('hidden');
      if (noQuizSection) noQuizSection.classList.remove('hidden');
    }
  }

  function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
});






const playBtn = document.getElementById("playNowBtn");

if (playBtn) {

    playBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("http://localhost:5000/api/quiz/status");

            const result = await response.json();

            if (result.isPublished) {

                window.location.href = "join.html";

            } else {

                alert("Quiz has not started yet. Please wait for the admin to publish the quiz.");

            }

        } catch (error) {

            console.error(error);

            alert("Cannot connect to server.");

        }

    });

}